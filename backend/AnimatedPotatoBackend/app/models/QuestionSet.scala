package models

import animatedPotato.protocol.protocol.{IdType, QuestionId}
import play.api.libs.json.{Format, Json, Reads, Writes}
import utils.{Constants, DB}
import slick.driver.PostgresDriver.simple._
import utils.Formatter._


case class QuestionSet(questionId: QuestionId, setId: IdType)


object QuestionSetDAO {

  lazy val questionSets = TableQuery[QuestionSetDAO]

  def insert(questionSet: QuestionSet): Boolean = DB { implicit session =>
    (questionSets += questionSet) > 0
  }

  def getAll(): List[QuestionSet] = DB { implicit session =>
    questionSets.list
  }

  def delete(questionID: IdType, setId: IdType) = DB { implicit session =>
    questionSets.filter(qs => qs.setId === setId && qs.questionId === questionID).delete == 1
  }

}

class QuestionSetDAO(tag: Tag) extends Table[QuestionSet](tag, "questionset") {

  def questionId = column[IdType]("questionid")

  def setId = column[IdType]("setid")

  def * = (questionId, setId) <> (QuestionSet.tupled, QuestionSet.unapply)
}