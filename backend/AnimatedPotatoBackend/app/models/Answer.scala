package models

import utils.{Constants, DatabaseConfig}

import slick.driver.PostgresDriver.simple._
import utils.Formatter._
case class YesNoAnswer(questionId: Int, value: Boolean)
case class Answer(id : Option[Int],userid: Int, questionId: Int, answer: List[String]= Nil)

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

  def getAnswers(userID: Int): List[Answer] = DatabaseConfig.DB.withSession { implicit session =>
        answers.filter( _.userid === userID).list
  }

  def getAnswer(userID : Int, questionID : Int): List[Answer] = DatabaseConfig.DB.withSession{ implicit sesison =>
    answers.filter(a => a.userid === userID && a.questionid == questionID).list
  }
}

class Answers(tag: Tag) extends Table[Answer](tag, "answer") {

  def id = column[Int]("id",O.AutoInc,O.PrimaryKey)

  def questionid = column[Int]("questionid")

  def userid = column[Int]("questionid")

  def answer = column[List[String]]("answer")

  def * = (id.?, questionid, userid, answer) <> (Answer.tupled, Answer.unapply)
}

