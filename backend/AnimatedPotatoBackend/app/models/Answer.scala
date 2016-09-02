package models

import animatedPotato.protocol.protocol.{IdType, QuestionId, UserIdType}
import utils.{Constants, DB}

import slick.driver.PostgresDriver.simple._
import utils.Formatter._

case class Answer(id : Option[IdType]=None, questionId: QuestionId, userId: Option[UserIdType], interviewId:IdType ,email: Option[String], answer: Boolean)

object Answers {
  lazy val answers = TableQuery[Answers]

  def insert(answer: Answer): Boolean = DB { implicit session =>
    try {
      answers += answer; true
    }
    catch {
      case e: Exception => false
    }
  }

  def update(answer: Answer): Boolean = DB { implicit session =>
    try {
      answers.filter(a => a.userId === answer.userId && a.questionId === answer.questionId).update(answer) > 0
    }
    catch {
      case e: Exception => false
    }

  }

  def delete(answer: Answer): Boolean = DB { implicit session =>
    try {
      answers.filter(a => a.userId === answer.userId && a.questionId === answer.questionId).delete > 0
    }
    catch {
      case e: Exception => false
    }

  }

  def getAnswers(userid: UserIdType): List[Answer] = DB { implicit session =>
        answers.filter( _.userId === userid).list
  }

  def getAnswer(userid : UserIdType, questionID : QuestionId): List[Answer] = DB{ implicit sesison =>
    answers.filter(a => a.userId === userid && a.questionId === questionID).list
  }

  def getAll(): List[Answer] = DB{ implicit session =>
    answers.list
  }
}

class Answers(tag: Tag) extends Table[Answer](tag, "answer") {

  def id = column[IdType]("id",O.AutoInc,O.PrimaryKey)

  def questionId = column[QuestionId]("questionid")

  def userId = column[UserIdType]("userid")

  def interviewId = column[IdType]("interviewid")

  def email = column[String]("email")

  def answer = column[Boolean]("answer")

  def * = (id.?, questionId, userId.?, interviewId,email.?, answer) <> (Answer.tupled, Answer.unapply)
}

