package models

import animatedPotato.protocol.protocol._
import core.BaseModel


case class Answer(id : Option[IdType]=None, questionId: QuestionId, userId: Option[UserIdType], interviewId:IdType ,email: Option[String], answer: Boolean) extends BaseModel
