package models

import animatedPotato.protocol.protocol
import animatedPotato.protocol.protocol.{Category, _}
import controllers.{CategoryScore, ComparativeReport}
import utils.DB
import dao.CategoryDAO

import slick.driver.PostgresDriver.simple._

case class Scores(interviewId: InterviewId, categoryId: CategoryId, score: Score, confidence: Confidence)

case class UserCategoryScores(participantId: IdType, interviewId: InterviewId, name: String, lastName: String, isPersonnel: Boolean, scores: List[CategoryScore], overallPercentage: Score, overallScore: Score, overAllConfidence: Confidence)

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

    val categoryDAO = new CategoryDAO
    val categories = categoryDAO.getAll

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
    val scores: List[Scores] = scoresDAO.list
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
            case Some(i) => CategoryScore(cat, i.score, Some(i.score / categoricalAverageScores.filter(_.category.id.get == i.categoryId).head.score), Some(i.confidence))
            // kullanıcıya soru sorulmamış kategoriler için reporta böyle bir CategoryScore eklendi
            case None => CategoryScore(cat, -1, Some(0), Some(0))
          }
        }

        UserCategoryScores(p.id.get, itw.id.get, p.name, p.lastname, Users.isPersonnel(p.email), categoryScore, categoryScore.filter(_.score >= 0).map(_.percentage.get).sum / categoryScore.count(_.score >= 0), itw.averageScore.get, categoryScore.filter(_.score >= 0).map(_.confidence.get).sum / categoryScore.count(_.score >= 0))
      }.sortWith(_.overallPercentage > _.overallPercentage)
    }
  }

  def getUserCategoryScores(interviewId: InterviewId) = DB { implicit session =>

    val categories = (new CategoryDAO).getAll
    val scores = scoresDAO.list
    val interview = InterviewDAO.interviewDAO.filter(_.id === interviewId).list

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

    interview.map { itw =>
      val p = Participants.getParticipant(itw.email).get
      val interviewScores: List[Scores] = scores.filter(_.interviewId == itw.id.get)

      val categoryScore = categories.map { cat =>
        interviewScores.find(_.categoryId == cat.id) match {
          case Some(i) => CategoryScore(cat, i.score, Some(i.score / categoricalAverageScores.filter(_.category.id.get == i.categoryId).head.score), Some(i.confidence))
          // kullanıcıya soru sorulmamış kategoriler için reporta böyle bir CategoryScore eklendi
          case None => CategoryScore(cat, -1, Some(0), Some(0))
        }
      }

      UserCategoryScores(p.id.get, itw.id.get, p.name, p.lastname, Users.isPersonnel(p.email), categoryScore, categoryScore.filter(_.score >= 0).map(_.percentage.get).sum / categoryScore.count(_.score >= 0), itw.averageScore.get, categoryScore.filter(_.score >= 0).map(_.confidence.get).sum / categoryScore.count(_.score >= 0))
    }.sortWith(_.overallPercentage > _.overallPercentage)

  }
}

class ScoresDAO(tag: Tag) extends Table[Scores](tag, "score") {

  def interviewId = column[IdType]("interviewid")

  def categoryId = column[CategoryId]("categoryid")

  def score = column[Score]("score")

  def confidence = column[Confidence]("confidence")

  def * = (interviewId, categoryId, score, confidence) <> (Scores.tupled, Scores.unapply)
}
