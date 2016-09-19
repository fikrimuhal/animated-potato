package models

import animatedPotato.protocol.protocol._
import core.BaseModel

/**
  * Created by who on 19.09.2016.
  */
case class Answer(id : Option[IdType]=None, questionId: QuestionId, userId: Option[UserIdType], interviewId:IdType ,email: Option[String], answer: Boolean) extends BaseModel
