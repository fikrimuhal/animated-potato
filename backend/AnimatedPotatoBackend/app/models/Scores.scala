package models

import java.io.Serializable
import java.sql.Timestamp

import animatedPotato.protocol.protocol._
import controllers.{CategoryScore, ComparativeReport}
import utils.DB
import dao.CategoryDAO

import slick.driver.PostgresDriver.simple._

case class Scores(interviewId: InterviewId, categoryId: CategoryId, score: Score, confidence: Confidence)

case class UserCategoryScores(participantId: IdType, interviewId: InterviewId, name: String, lastName: String, email: Email, phone: String, isPersonnel: Boolean, scores: List[CategoryScore], overallPercentage: Score, overallScore: Score, overAllConfidence: Confidence, order: Int)

case class CategoryResults(participantId: IdType, interviewId: InterviewId, name: String, lastname: String, isPersonnel: Boolean, order: Int, score: Score)

case class CategoryResultsResponse(category: Category, results: List[CategoryResults], numberOfParticipant: Int)

case class InterviewResult(categoryScores: List[CategoryScore], date: Timestamp, overallScore: Score, order: Int, percentage: Double)

object ScoresDAO {

  lazy val scoresDAO = TableQuery[ScoresDAO]

  def insertAll(scoresList: List[Scores]): Option[Int] = DB { implicit session =>
    scoresDAO.insertAll(scoresList: _*)
  }

  def getAll: List[Scores] = DB { implicit session =>
    scoresDAO.list
  }

  def getComparativeReport(interviewId: InterviewId): ComparativeReport = DB { implicit session =>

    val personnelInterviewIDs = InterviewDAO.getPersonnelInterviewIds
    val categories = (new CategoryDAO).getAll

    val allScores: List[Scores] = scoresDAO.list

    val personnelScores: List[Scores] = allScores.filter(personnelInterviewIDs contains _.interviewId)
    val personnelCategoryScoreTuple: List[(CategoryId, Score)] = personnelScores.map(x => (x.categoryId, x.score)).groupBy(_._1).mapValues(x => x.map(_._2).sum / x.length).map { case (k, v) => (k, v) }(collection.breakOut)
    val personnelScore: List[CategoryScore] = personnelCategoryScoreTuple.map(x => CategoryScore(categories.filter(c => c.id.get == x._1).head, x._2))

    val userScore = allScores.filter(x => x.interviewId == interviewId).map(x => CategoryScore(categories.filter(c => c.id.get == x.categoryId).head, x.score))

    val allScoreTuple: List[(CategoryId, Score)] = allScores.map(x => (x.categoryId, x.score)).groupBy(_._1).mapValues(x => x.map(_._2).sum / x.length).map { case (k, v) => (k, v) }(collection.breakOut)
    val allScore: List[CategoryScore] = allScoreTuple.map(x => CategoryScore(categories.filter(c => c.id.get == x._1).head, x._2))

    ComparativeReport(userScore, personnelScore, allScore)
  }

  /**
    *
    * @param interviewId
    * @return UserCategoryScores of (1: interviewID, 2: All interviews average, 3: Personnels Average 4: Each Personnel's interview )
    */
  def getUsersResults(interviewId: InterviewId): List[UserCategoryScores] = DB { implicit session =>
    val categories = (new CategoryDAO).getAll
    val interviews = InterviewDAO.getRegisteredInterviews
    val scores: List[Scores] = ScoresDAO.getAll.filter(s => interviews.map(_.id.get).contains(s.interviewId))

    if (interviews == Nil || scores == Nil) Nil

    else {
      val numberOfParticipant = interviews.length
      val personnelInterviewIds = InterviewDAO.getPersonnelInterviewIds
      val numberOfPersonnel = personnelInterviewIds.length

      def getCategoryScore(scores: List[Scores]): List[CategoryScore] = {
        categories.map { category =>
          val scoreOfCategory = scores.filter(_.categoryId == category.id.get)
          val numberOfParticipants = scoreOfCategory.length
          val score: Double = if (scoreOfCategory.isEmpty) -1 else scoreOfCategory.map(_.score).sum / numberOfParticipants
          val order = (score :: scoreOfCategory.map(_.score)).sortBy(x => 1 - x).indexOf(score) + 1
          val percentage: Double = order / numberOfParticipants
          val confidence: Double = if (scoreOfCategory.isEmpty) -1 else scoreOfCategory.map(_.confidence).sum / numberOfParticipants
          CategoryScore(category, score, Some(percentage), Some(confidence), Some(order))
        }.filter(_.score != -1)
      }

      val allCategoricalScores = getCategoryScore(scores)
      val personnelCategoricalScores = getCategoryScore(scores.filter(s => personnelInterviewIds contains s.interviewId))

      // sonuçta sadece gelen interviewID ve personel interviewleri olacak
      val filteredInterviews = interviews.filter(i => (i.id.get == interviewId) || personnelInterviewIds.contains(i.id.get))
      val participants = Participants.getByEmailList(filteredInterviews.map(_.email))

      filteredInterviews.map { itw =>

        val p = participants.find(_.email == itw.email).get
        val interviewScores: List[Scores] = scores.filter(_.interviewId == itw.id.get)

        val categoryScore = categories.map { cat =>

          interviewScores.find(_.categoryId == cat.id.get) match {

            case Some(i) =>

              val orderInCategory = scores.filter(_.categoryId == cat.id.get).sortBy(1 - _.score).zipWithIndex.find(_._1.interviewId == itw.id.get).map(_._2).get + 1
              CategoryScore(cat, i.score, Some(orderInCategory / scores.count(_.categoryId == cat.id.get).toDouble), Some(i.confidence), Some(orderInCategory))

            // kullanıcıya soru sorulmamış kategoriler için Score'u -1 diğer değerleri 0 atadım
            case None => CategoryScore(cat, -1, Some(0), Some(0))
          }
        }

        val isPersonnel = personnelInterviewIds contains itw.id.get
        val order = interviews.sortBy(1 - _.averageScore.get).zipWithIndex.find(_._1.id == itw.id).map(_._2).get + 1
        val overAllPercentage = (order.toDouble / numberOfParticipant) * 100
        UserCategoryScores(p.id.get, itw.id.get, p.name, p.lastname, p.email, p.phone, isPersonnel, categoryScore, overAllPercentage, itw.averageScore.get, categoryScore.filter(_.score >= 0).map(_.confidence.get).sum / categoryScore.count(_.score >= 0), order)
      }.::(UserCategoryScores(-2, -2, "PERSONNEL", "PERSONNEL", "PERSONNEL", "", isPersonnel = true, personnelCategoricalScores, -1, -1, -1, -1))
        .::(UserCategoryScores(-4, -4, "ALL", "ALL", "ALL", "", isPersonnel = false, allCategoricalScores, -1, -1, -1, -1))
    }
  }


  def getCategoryResults(interviewId: InterviewId) = DB { implicit session =>
    val PERSONNEL_INTERVIEW_ID = -2
    val ALL_INTERVIEW_ID = -4

    val interviews = InterviewDAO.getLastRegisteredInterviews

    val scores = ScoresDAO.getAll.filter(s => interviews.map(_.id.get).contains(s.interviewId))
    val categories = (new CategoryDAO).getAll
    val personnelInterviewIds = InterviewDAO.getPersonnelInterviewIds
    val personnelInterviews = interviews.filter(i => personnelInterviewIds.contains(i.id.get))
    val participants = Participants.getByEmailList(interviews.map(_.email))

    val numberOfInterviews = interviews.length
    val numberOfPersonnels = personnelInterviews.length
    val overallAllAverage = interviews.map(_.averageScore.get).sum / numberOfInterviews
    val overallPersonnelAverage = personnelInterviews.map(_.averageScore.get).sum / numberOfPersonnels

    val overallCategory = models.Category(Some(-1), "Overall")

    val allFakeInterview = Interview(Some(ALL_INTERVIEW_ID), "", true, None, None, Some(overallAllAverage))
    val personnelFakeInterview = Interview(Some(PERSONNEL_INTERVIEW_ID), "", true, None, None, Some(overallPersonnelAverage))

    val overallResults = (allFakeInterview :: personnelFakeInterview :: interviews).sortBy(1 - _.averageScore.get).zipWithIndex.map { case (interview, order) =>

      if (interview.id.get == PERSONNEL_INTERVIEW_ID)
        CategoryResults(PERSONNEL_INTERVIEW_ID, PERSONNEL_INTERVIEW_ID, "Personnel", "Personnel", isPersonnel = true, order + 1, overallPersonnelAverage)

      else if (interview.id.get == ALL_INTERVIEW_ID)
        CategoryResults(ALL_INTERVIEW_ID, ALL_INTERVIEW_ID, "All", "All", isPersonnel = false, order + 1, overallAllAverage)

      else {
        val email = interviews.filter(_.id.get == interview.id.get).map(_.email).head
        val p = participants.filter(_.email == email).head
        val isPersonnel = personnelInterviewIds contains interview.id.get
        CategoryResults(p.id.get, interview.id.get, p.name, p.lastname, isPersonnel, order + 1, interview.averageScore.get)
      }
    }
    val order = overallResults.zipWithIndex.find(_._1.interviewId == interviewId).map(_._2).getOrElse(-1) + 1

    val filteredResults = overallResults.filter(x => List(1, order - 1, order, order + 1).contains(x.order) ||
      List(ALL_INTERVIEW_ID, PERSONNEL_INTERVIEW_ID).contains(x.interviewId))

    val overallFakeCategory = CategoryResultsResponse(overallCategory, filteredResults, numberOfInterviews)

    categories.map { category =>

      val scoresOfCategory = scores.filter(_.categoryId == category.id.get)
      val personnelsSOC = scoresOfCategory.filter(s => personnelInterviewIds.contains(s.interviewId)) // personnelScoreOfCategory
    val personnelsCategoryAverage: Double = if (personnelsSOC.isEmpty) 0 else personnelsSOC.map(_.score).sum / personnelsSOC.length
      val allAverage: Double = if (scoresOfCategory.isEmpty) 0 else scoresOfCategory.map(_.score).sum / scoresOfCategory.length

      val ALL_SCORE = Scores(ALL_INTERVIEW_ID, category.id.get, allAverage, -1)
      val PERSONNEL_SCORE = Scores(PERSONNEL_INTERVIEW_ID, category.id.get, personnelsCategoryAverage, -1)

      val categoryScores = {
        if (scoresOfCategory.isEmpty) scoresOfCategory
        else if (personnelsSOC.isEmpty) ALL_SCORE :: scoresOfCategory
        else ALL_SCORE :: PERSONNEL_SCORE :: scoresOfCategory
      }
      val categoryResults = categoryScores.sortBy(1 - _.score).zipWithIndex.map { case (score, order) =>

        if (score.interviewId == PERSONNEL_INTERVIEW_ID)
          CategoryResults(PERSONNEL_INTERVIEW_ID, PERSONNEL_INTERVIEW_ID, "Personnel", "Personnel", isPersonnel = true, order + 1, personnelsCategoryAverage)

        else if (score.interviewId == ALL_INTERVIEW_ID)
          CategoryResults(ALL_INTERVIEW_ID, ALL_INTERVIEW_ID, "All", "All", isPersonnel = false, order + 1, allAverage)

        else {
          val email = interviews.filter(_.id.get == score.interviewId).map(_.email).head
          val p = participants.filter(_.email == email).head
          val isPersonnel = personnelInterviewIds contains score.interviewId
          CategoryResults(p.id.get, score.interviewId, p.name, p.lastname, isPersonnel, order + 1, score.score)
        }
      }.sortBy(_.order)

      val numberOfParticipants = categoryResults.length
      val interviewOrder = categoryResults.zipWithIndex.find(_._1.interviewId == interviewId).map(_._2).getOrElse(-1) + 1
      val filteredResults = categoryResults.filter(x => List(1, interviewOrder - 1, interviewOrder, interviewOrder + 1).contains(x.order) ||
        List(ALL_INTERVIEW_ID, PERSONNEL_INTERVIEW_ID).contains(x.interviewId))

      CategoryResultsResponse(category, filteredResults, numberOfParticipants)
    }.::(overallFakeCategory)
  }

  def getUserReport(userID: IdType) = DB { implicit session =>

    val userInterviews = InterviewDAO.getUserInterviews(userID)
    val registeredInterviews = InterviewDAO.getRegisteredInterviews
    val registeredScores = scoresDAO.filter(s => s.interviewId inSet registeredInterviews.map(_.id.get)).list.sortBy(1 - _.score)
    val categories = (new CategoryDAO).getAll

    userInterviews.map { interview =>
      val userInterviewScores = registeredScores.filter(_.interviewId == interview.id.get)

      val scores = categories.map { category =>

        val categoryScores = userInterviewScores.filter(_.categoryId == category.id.get)
        if (categoryScores.isEmpty)  CategoryScore(category,-1,Some(-1),Some(-1),Some(-1))
        else {
          val (score, confidence) = userInterviewScores.find(_.categoryId == category.id.get).map(x => (x.score, x.confidence)).get
          val order = registeredScores.zipWithIndex.find(x => x._1.interviewId == interview.id.get && x._1.categoryId == category.id.get).map(_._2).get + 1
          val numberOfParticipant = registeredScores.count(_.categoryId == category.id.get)
          val percentage = if (categoryScores.isEmpty) -1 else (order.toDouble / numberOfParticipant) * 100

          CategoryScore(category, score, Some(percentage), Some(confidence), Some(order))
        }
      }
      val order = registeredInterviews.sortBy(1 - _.averageScore.get).zipWithIndex.find(_._1.id.get == interview.id.get).get._2 + 1
      val percentage = (order.toDouble / registeredInterviews.length) * 100
      InterviewResult(scores, interview.startDate.get, interview.averageScore.get, order, percentage)
    }.sortBy(_.date.getTime)

  }

}

class ScoresDAO(tag: Tag) extends Table[Scores](tag, "score") {

  def interviewId = column[IdType]("interviewid")

  def categoryId = column[CategoryId]("categoryid")

  def score = column[Score]("score")

  def confidence = column[Confidence]("confidence")

  def * = (interviewId, categoryId, score, confidence) <> (Scores.tupled, Scores.unapply)
}
