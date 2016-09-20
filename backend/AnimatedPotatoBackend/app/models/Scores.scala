package models

import animatedPotato.protocol.protocol.{Category, _}
import controllers.{CategoryScore, ComparativeReport}
import utils.DB
import dao.CategoryDAO

import slick.driver.PostgresDriver.simple._

case class Scores(interviewId: InterviewId, categoryId: CategoryId, score: Score, confidence: Confidence)

case class UserCategoryScores(participantId: IdType, interviewId: InterviewId, name: String, lastName: String, email : Email, phone: String,isPersonnel: Boolean, scores: List[CategoryScore], overallPercentage: Score, overallScore: Score, overAllConfidence: Confidence, order : Int)

case class CategoryResults(participantId : IdType, interviewId: InterviewId,name: String,lastname : String, order : Int, score : Score)
case class CategoryResultsResponse(category: Category,results: List[CategoryResults])

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

    val personnelInterviewIDs = InterviewDAO.interviewDAO.filter(itw => itw.hasFinished === true)
      .list
      .filter(itw => Users.isPersonnel(itw.email))
      .map(_.id.get)

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


  def getPersonnelAverage = DB { implicit session =>

    val personnelInterviewIDs = InterviewDAO.interviewDAO.filter(itw => itw.hasFinished === true)
      .list
      .filter(itw => Users.isPersonnel(itw.email))
      .map(_.id.get)
    val categoryDAO = new CategoryDAO
    val categories = categoryDAO.getAll
    val personnelScores: List[Scores] = scoresDAO.filter(_.interviewId inSet personnelInterviewIDs).list
    val personnelCategoryScoreTuple: List[(CategoryId, Score)] = personnelScores.map(x => (x.categoryId, x.score)).groupBy(_._1).mapValues(x => x.map(_._2).sum / x.length).map { case (k, v) => (k, v) }(collection.breakOut)
    personnelCategoryScoreTuple.map(x => CategoryScore(categories.filter(c => c.id.get == x._1).head, x._2))

  }

  def getCategoryScores: List[UserCategoryScores] = DB { implicit session =>

    val categories = (new CategoryDAO).getAll
    val scores: List[Scores] = ScoresDAO.getAll
    val interviews = InterviewDAO.interviewDAO.filter(_.hasFinished).list

    if (interviews == Nil || scores == Nil) {
      Nil
    }
    else {
      val categoryAverageScoreConfidenceTuple: List[(CategoryId, (Score, Confidence))] =
        scores.map(x => (x.categoryId, x.score, x.confidence))
          .groupBy(_._1)
          .mapValues(x => (x.map(_._2).sum / x.length, x.map(_._3).sum / x.length))
          .map { case (k, m) => (k, m) }(collection.breakOut)

      val categoricalAverageScores: List[CategoryScore] =
        categoryAverageScoreConfidenceTuple
          .map(x => CategoryScore(categories.filter(c => c.id.get == x._1).head, x._2._1, Some(x._2._2)))

      interviews.map { itw =>
        val p = Participants.getParticipant(itw.email).get
        val interviewScores: List[Scores] = scores.filter(_.interviewId == itw.id.get)

        val categoryScore = categories.map { cat =>
          interviewScores.find(_.categoryId == cat.id.get) match {
            case Some(i) =>
              val orderInCategory = scores.filter(_.categoryId == cat.id.get).sortBy(1 - _.score).zipWithIndex.find(_._1.interviewId == itw.id.get).map(_._2).get + 1
              CategoryScore(cat, i.score, Some(1-(orderInCategory /  scores.count(_.categoryId == cat.id.get).toDouble )) , Some(i.confidence),Some(orderInCategory))
            // kullanıcıya soru sorulmamış kategoriler için reporta böyle bir CategoryScore eklendi
            case None => CategoryScore(cat, -1, Some(0), Some(0))
          }
        }

        UserCategoryScores(p.id.get, itw.id.get, p.name, p.lastname,p.email,p.lastname, Users.isPersonnel(p.email), categoryScore, categoryScore.filter(_.score >= 0).map(_.percentage.get).sum / categoryScore.count(_.score >= 0), itw.averageScore.get, categoryScore.filter(_.score >= 0).map(_.confidence.get).sum / categoryScore.count(_.score >= 0),interviews.sortBy(1 - _.averageScore.get).zipWithIndex.find(_._1.id == itw.id).map(_._2).get + 1)
      }.sortBy(_.order)
    }
  }

  def getInterviewCategoryScores(interviewId: InterviewId): List[UserCategoryScores] = DB { implicit session =>

    val categories = (new CategoryDAO).getAll
    val scores = scoresDAO.list
    val interviews = InterviewDAO.interviewDAO.filter(_.hasFinished).list
    val interview = interviews.filter(_.id == interviewId)

    val categoricalAverageScoreTuple: List[(CategoryId, Score)] =
      scores.map(x => (x.categoryId, x.score))
        .groupBy(_._1) // groupby category
        .mapValues(x => x.map(_._2).sum / x.length) // categorigal score mean
        .map { case (k, v) => (k, v) }(collection.breakOut) // Map to tuple List

    // tuple list to List[CategoryScore]
    val categoricalAverageScores: List[CategoryScore] =
    categoricalAverageScoreTuple
      .map(x =>
        CategoryScore(categories.filter(c => c.id.get == x._1).head, x._2))

    interviews.map { itw =>
      val p = Participants.getParticipant(itw.email).get
      val interviewScores: List[Scores] = scores.filter(_.interviewId == itw.id.get)

      val categoryScore = categories.map { cat =>
        interviewScores.find(_.categoryId == cat.id) match {
          case Some(i) =>
            val orderInCategory = scores.filter(_.categoryId == cat.id.get).sortBy(1 - _.score).zipWithIndex.find(_._1.interviewId == itw.id.get).map(_._2).get + 1
            CategoryScore(cat, i.score, Some(1-(orderInCategory /  scores.count(_.categoryId == cat.id.get).toDouble )) , Some(i.confidence),Some(orderInCategory))
          // kullanıcıya soru sorulmamış kategoriler için reporta böyle bir CategoryScore eklendi
          case None => CategoryScore(cat, -1, Some(0), Some(0))
        }
      }

      UserCategoryScores(p.id.get, itw.id.get, p.name, p.lastname,p.email,p.lastname, Users.isPersonnel(p.email), categoryScore, categoryScore.filter(_.score >= 0).map(_.percentage.get).sum / categoryScore.count(_.score >= 0), itw.averageScore.get, categoryScore.filter(_.score >= 0).map(_.confidence.get).sum / categoryScore.count(_.score >= 0),interviews.sortBy(1 - _.averageScore.get).zipWithIndex.find(_._1.id == itw.id).map(_._2).get + 1)
    }.sortBy(_.order)

  }

  def getCategoryResults(interviewId: InterviewId) = DB { implicit session =>

    val scores = ScoresDAO.getAll
    val categoryIDs = scores.map(_.categoryId).distinct
    val categories = (new CategoryDAO).getAll

    categoryIDs.map{ cat =>

      val results = scores.filter(_.categoryId == cat).sortBy(1 - _.score).zipWithIndex.map{ x =>
         val p = InterviewDAO.getParticipantByInterviewId(x._1.interviewId)
        CategoryResults(p.id.get,x._1.interviewId,p.name,p.lastname,x._2+1,x._1.score)
      }
      val numberOfParticipants = results.length
      val interviewOrder = results.zipWithIndex.find(_._1.interviewId == interviewId).map(_._2).get

      results.filter(x => List(1,2,numberOfParticipants,numberOfParticipants-1,interviewOrder,interviewOrder+1,interviewOrder-1).contains(x.order))

      CategoryResultsResponse(categories.find(_.id.get == cat).get, results)
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
