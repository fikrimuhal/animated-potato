package models

import animatedPotato.protocol.protocol.{IdType, QuestionId, UserIdType}
import utils.{Constants, DatabaseConfig}

import slick.driver.PostgresDriver.simple._
import utils.Formatter._
case class Answer(id : Option[IdType], questionId: QuestionId, userid: UserIdType, answer: Boolean)

object Answers {
  lazy val answers = TableQuery[Answers]

  def insert(answer: Answer): Boolean = DatabaseConfig.DB.withSession { implicit session =>
    try {
      answers += answer; true
    }
    catch {
      case e: Exception => false
    }
  }

  def update(answer: Answer): Boolean = DatabaseConfig.DB.withSession { implicit session =>
    try {
      answers.filter(a => a.userid === answer.userid && a.questionid === answer.questionId).update(answer) > 0
    }
    catch {
      case e: Exception => false
    }

  }

  def delete(answer: Answer): Boolean = DatabaseConfig.DB.withSession { implicit session =>
    try {
      answers.filter(a => a.userid === answer.userid && a.questionid === answer.questionId).delete > 0
    }
    catch {
      case e: Exception => false
    }

  }

  def getAnswers(userid: UserIdType): List[Answer] = DatabaseConfig.DB.withSession { implicit session =>
        answers.filter( _.userid === userid).list
  }

  def getAnswer(userid : UserIdType, questionID : QuestionId): List[Answer] = DatabaseConfig.DB.withSession{ implicit sesison =>
    answers.filter(a => a.userid === userid && a.questionid === questionID).list
  }
  def getAll(): List[Answer] = DatabaseConfig.DB.withSession{ implicit session =>
    answers.list
  }
}

class Answers(tag: Tag) extends Table[Answer](tag, "answer") {

  def id = column[IdType]("id",O.AutoInc,O.PrimaryKey)

  def questionid = column[QuestionId]("questionid")

  def userid = column[UserIdType]("userid")

  def answer = column[Boolean]("answer")

  def * = (id.?, questionid, userid, answer) <> (Answer.tupled, Answer.unapply)
}

