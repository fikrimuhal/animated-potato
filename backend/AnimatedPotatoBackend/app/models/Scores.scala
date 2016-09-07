package models

import animatedPotato.protocol.protocol._
import utils.DB

import slick.driver.PostgresDriver.simple._

case class Scores(interviewId: InterviewId, categoryId: CategoryId, score: Score)

object ScoresDAO {
  lazy val scoresDAO = TableQuery[ScoresDAO]

  def insert(scores: Scores): Boolean = DB { implicit session =>
    (scoresDAO += scores) == 1
  }

  def getAll: List[Scores] = DB { implicit session =>
    scoresDAO.list
  }

  def getById(interviewId: InterviewId): List[Scores] = DB { implicit session =>
    scoresDAO.filter(_.interviewId === interviewId).list
  }


}

class ScoresDAO(tag: Tag) extends Table[Scores](tag, "score") {

  def interviewId = column[IdType]("interviewid")

  def categoryId = column[CategoryId]("categoryid")

  def score = column[Score]("score")

  def * = (interviewId, categoryId, score) <> (Scores.tupled, Scores.unapply)
}
