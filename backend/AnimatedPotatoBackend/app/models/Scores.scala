package models

import animatedPotato.protocol.protocol.{Category, _}
import controllers.{CategoryScore, ComparativeReport}
import utils.DB
import dao.CategoryDAO

import slick.driver.PostgresDriver.simple._

case class Scores(interviewId: InterviewId, categoryId: CategoryId, score: Score)
case class UserCategoryScores(participantId: IdType, name: String, lastName: String, scores: List[CategoryScore])

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

  def getComparativeReport(email: Email): ComparativeReport = DB { implicit session =>

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

    val userInterviewId: Option[IdType] = InterviewDAO.getInterviewID(email)
    val userScore = allScores.filter(x => x.interviewId == userInterviewId.getOrElse(-1)).map(x => CategoryScore(categories.filter(c => c.id.get == x.categoryId).head, x.score))

    val allScoreTuple: List[(CategoryId, Score)] = allScores.map(x => (x.categoryId, x.score)).groupBy(_._1).mapValues(x => x.map(_._2).sum / x.length).map { case (k, v) => (k, v) }(collection.breakOut)
    val allScore: List[CategoryScore] = allScoreTuple.map(x => CategoryScore(categories.filter(c => c.id.get == x._1).head, x._2))

    ComparativeReport(userScore, personnelResponse, allScore)
  }

  def getScore(email: Email): List[CategoryScore] = DB { implicit session =>

    val interviewId = InterviewDAO.getInterviewID(email)
    val categoryDAO = new CategoryDAO
    val categories = categoryDAO.getAll

    scoresDAO.filter(_.interviewId === interviewId).list
      .map(x => CategoryScore(categories.filter(c => c.id.get == x.categoryId).head, x.score))

  }

  def getAllAverage: List[CategoryScore] = DB { implicit session =>

    val categoryDAO = new CategoryDAO
    val categories = categoryDAO.getAll

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

  def getUserCategoryScores = DB { implicit session =>

    val categories = (new CategoryDAO).getAll
    val interviews = InterviewDAO.interviewDAO.filter(_.hasFinished).list
    val interviewIds = interviews.map(_.id.get)
    val scores = scoresDAO.filter(_.interviewId inSet interviewIds).list

    interviews.map { itw =>
      val p = Participants.getParticipant(itw.email).get
      UserCategoryScores(p.id.get, p.name, p.lastname,
        scores.map(x => CategoryScore(categories.filter(c => c.id.get == x.categoryId).head, x.score)))
    }
  }




}

class ScoresDAO(tag: Tag) extends Table[Scores](tag, "score") {

  def interviewId = column[IdType]("interviewid")

  def categoryId = column[CategoryId]("categoryid")

  def score = column[Score]("score")

  def * = (interviewId, categoryId, score) <> (Scores.tupled, Scores.unapply)
}
