package table


import animatedPotato.protocol.protocol._
import core.BaseTable
import models.{Answer, Category}

import slick.driver.PostgresDriver.simple._

class AnswerTable(tag: Tag) extends BaseTable[Answer](tag, "answer") {

  def questionId = column[QuestionId]("questionid")

  def userId = column[UserIdType]("userid")

  def interviewId = column[IdType]("interviewid")

  def email = column[String]("email")

  def answer = column[Boolean]("answer")

  def * = (id.?, questionId, userId.?, interviewId, email.?, answer) <> (Answer.tupled, Answer.unapply)
}

