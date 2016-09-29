package models

import animatedPotato.protocol.protocol.{Category, _}
import controllers.{CategoryScore, ComparativeReport}
import utils.DB
import dao.CategoryDAO

import slick.driver.PostgresDriver.simple._

case class Scores(interviewId: InterviewId, categoryId: CategoryId, score: Score, confidence: Confidence)

case class UserCategoryScores(participantId: IdType, interviewId: InterviewId, name: String, lastName: String, email: Email, phone: String, isPersonnel: Boolean, scores: List[CategoryScore], overallPercentage: Score, overallScore: Score, overAllConfidence: Confidence, order: Int)

case class CategoryResults(participantId: IdType, interviewId: InterviewId, name: String, lastname: String, isPersonnel: Boolean, order: Int, score: Score)

case class CategoryResultsResponse(category: Category, results: List[CategoryResults], numberOfParticipant: Int)

object ScoresDAO {

  lazy val scoresDAO = TableQuery[ScoresDAO]

  def insert(scores: Scores): Boolean = DB { implicit session =>
    (scoresDAO += scores) == 1
  }

  def insertAll(scoresList: List[Scores]): Option[Int] = DB { implicit session =>
    scoresDAO.insertAll(scoresList: _*)
  }

  def getAll: List[Scores] = DB { implicit session =>
    scoresDAO.list
  }

  def getById(interviewId: InterviewId): List[Scores] = DB { implicit session =>
    scoresDAO.filter(_.interviewId === interviewId).list
  }

  def getComparativeReport(interviewId: InterviewId): ComparativeReport = DB { implicit session =>

    val personnelInterviewIDs = InterviewDAO.getPersonnelInterviewIds
    val categories = (new CategoryDAO).getAll

    val allScores: List[Scores] = scoresDAO.list

    val personnelScores: List[Scores] = allScores.filter(personnelInterviewIDs contains _.interviewId)
    val personnelCategoryScoreTuple: List[(CategoryId, Score)] = personnelScores.map(x => (x.categoryId, x.score)).groupBy(_._1).mapValues(x => x.map(_._2).sum / x.length).map { case (k, v) => (k, v) }(collection.breakOut)
    val personnelResponse: List[CategoryScore] = personnelCategoryScoreTuple.map(x => CategoryScore(categories.filter(c => c.id.get == x._1).head, x._2))

    val userScore = allScores.filter(x => x.interviewId == interviewId).map(x => CategoryScore(categories.filter(c => c.id.get == x.categoryId).head, x.score))

    val allScoreTuple: List[(CategoryId, Score)] = allScores.map(x => (x.categoryId, x.score)).groupBy(_._1).mapValues(x => x.map(_._2).sum / x.length).map { case (k, v) => (k, v) }(collection.breakOut)
    val allScore: List[CategoryScore] = allScoreTuple.map(x => CategoryScore(categories.filter(c => c.id.get == x._1).head, x._2))

    ComparativeReport(userScore, personnelResponse, allScore)
  }

  def getScore(interviewId: InterviewId): List[CategoryScore] = DB { implicit session =>

    val categoryDAO = new CategoryDAO
    val categories = categoryDAO.getAll

    scoresDAO.filter(_.interviewId === interviewId).list
      .map(x => CategoryScore(categories.filter(c => c.id.get == x.categoryId).head, x.score))

  }

  def getAllAverage: List[CategoryScore] = DB { implicit session =>

    val categories = (new CategoryDAO).getAll

    scoresDAO.list.map(x => CategoryScore(categories.filter(c => c.id.get == x.categoryId).head, x.score))
  }


  def getPersonnelAverage: List[CategoryScore] = DB { implicit session =>

    val personnelInterviewIDs = InterviewDAO.interviewDAO.filter(itw => itw.hasFinished === true)
      .list
      .filter(itw => Users.isPersonnel(itw.email))
      .map(_.id.get)
    val categories = (new CategoryDAO).getAll
    val personnelScores: List[Scores] = scoresDAO.filter(_.interviewId inSet personnelInterviewIDs).list
    val personnelCategoryScoreTuple: List[(CategoryId, Score)] = personnelScores.map(x => (x.categoryId, x.score)).groupBy(_._1).mapValues(x => x.map(_._2).sum / x.length).map { case (k, v) => (k, v) }(collection.breakOut)
    personnelCategoryScoreTuple.map(x => CategoryScore(categories.filter(c => c.id.get == x._1).head, x._2))

  }

  /**
    *
    * @param interviewId
    * @return UserCategoryScores of (1: interviewID, 2: All interviews average, 3: Personnels Average 4: Each Personnel's interview )
    */
  def getUsersResults(interviewId: InterviewId): List[UserCategoryScores] = DB { implicit session =>
    val categories = (new CategoryDAO).getAll
    val scores: List[Scores] = ScoresDAO.getAll
    val interviews = InterviewDAO.interviewDAO.filter(_.hasFinished).list

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
          val percentage: Double = order / (numberOfParticipants + 1)
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
              CategoryScore(cat, i.score, Some(1 - (orderInCategory / scores.count(_.categoryId == cat.id.get).toDouble)), Some(i.confidence), Some(orderInCategory))

            // kullanıcıya soru sorulmamış kategoriler için Score'u -1 diğer değerleri 0 atadım
            case None => CategoryScore(cat, -1, Some(0), Some(0))
          }
        } //.::(CategoryScore(Category(Some(99),"All"), itw.averageScore.get,None,None,filteredInterviews.sortBy(1- _.score).zipWithIndex.find((_._1.averageScore.get))))


        UserCategoryScores(p.id.get, itw.id.get, p.name, p.lastname, p.email, p.phone, personnelInterviewIds contains p.id.get, categoryScore, (categoryScore.filter(_.score >= 0).map(_.score).sum / categoryScore.count(_.score >= 0)) * 100, itw.averageScore.get, categoryScore.filter(_.score >= 0).map(_.confidence.get).sum / categoryScore.count(_.score >= 0), interviews.sortBy(1 - _.averageScore.get).zipWithIndex.find(_._1.id == itw.id).map(_._2).get + 1)
      }.::(UserCategoryScores(-2, -2, "PERSONNEL", "PERSONNEL", "PERSONNEL", "", isPersonnel = true, personnelCategoricalScores, -1, personnelCategoricalScores.filter(_.score >= 0).map(_.score).sum / numberOfPersonnel, -1, -1))
        .::(UserCategoryScores(-4, -4, "ALL", "ALL", "ALL", "", isPersonnel = false, allCategoricalScores, -1, allCategoricalScores.filter(_.score >= 0).map(_.score).sum / numberOfParticipant, -1, -1))
    }
  }

  def getInterviewCategoryScores(interviewId: InterviewId): List[UserCategoryScores] = DB { implicit session =>

    val categories = (new CategoryDAO).getAll
    val scores = scoresDAO.list
    val interviews = InterviewDAO.interviewDAO.filter(_.hasFinished).list

    interviews.map { itw =>
      val p = Participants.get(itw.email).get
      val interviewScores: List[Scores] = scores.filter(_.interviewId == itw.id.get)

      val categoryScore = categories.map { cat =>
        interviewScores.find(_.categoryId == cat.id) match {
          case Some(i) =>
            val orderInCategory = scores.filter(_.categoryId == cat.id.get).sortBy(1 - _.score).zipWithIndex.find(_._1.interviewId == itw.id.get).map(_._2).get + 1
            CategoryScore(cat, i.score, Some(1 - (orderInCategory / scores.count(_.categoryId == cat.id.get).toDouble)), Some(i.confidence), Some(orderInCategory))
          // kullanıcıya soru sorulmamış kategoriler için reporta böyle bir CategoryScore eklendi
          case None => CategoryScore(cat, -1, Some(0), Some(0))
        }
      }

      UserCategoryScores(p.id.get, itw.id.get, p.name, p.lastname, p.email, p.lastname, Users.isPersonnel(p.email), categoryScore, categoryScore.filter(_.score >= 0).map(_.percentage.get).sum / categoryScore.count(_.score >= 0), itw.averageScore.get, categoryScore.filter(_.score >= 0).map(_.confidence.get).sum / categoryScore.count(_.score >= 0), interviews.sortBy(1 - _.averageScore.get).zipWithIndex.find(_._1.id == itw.id).map(_._2).get + 1)
    }

  }

  def getCategoryResults(interviewId: InterviewId) = DB { implicit session =>

    val registeredInterviews = InterviewDAO.getRegisteredInterviews
    val lastInterviewIDs: List[IdType] = registeredInterviews.groupBy(_.email).values.toList.
      map(i => i.sortBy(_.startDate.get.getTime).last.id.get)

    val interviews = registeredInterviews.filter(i => lastInterviewIDs.contains(i.id.get))
    val scores = ScoresDAO.getAll.filter(s => interviews.map(_.id.get).contains(s.interviewId))
    val categories = (new CategoryDAO).getAll
    val personnelInterviewIds = InterviewDAO.getPersonnelInterviewIds
    val participants = Participants.getByEmailList(interviews.map(_.email))

    val PERSONNEL_INTERVIEW_ID = -2
    val ALL_INTERVIEW_ID = -4

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
    }

  }
}

class ScoresDAO(tag: Tag) extends Table[Scores](tag, "score") {

  def interviewId = column[IdType]("interviewid")

  def categoryId = column[CategoryId]("categoryid")

  def score = column[Score]("score")

  def confidence = column[Confidence]("confidence")

  def * = (interviewId, categoryId, score, confidence) <> (Scores.tupled, Scores.unapply)
}
