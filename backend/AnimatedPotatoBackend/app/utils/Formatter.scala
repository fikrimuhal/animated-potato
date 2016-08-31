package utils

import animatedPotato.protocol.protocol.IdType
import models._
import play.api.libs.json.Json

import slick.driver.PostgresDriver.simple._


object Formatter {
  implicit  val participantFormat = Json.format[Participant]
  implicit  val questionOptionFormat = Json.format[QuestionOption]
  implicit val participantResponseFormat = Json.format[ParticipantResponse]
  implicit val questionCategoryFormat = Json.format[QuestionCategory]
  implicit val questionCategoryRequestFormat = Json.format[QuestionCategoryRequest]
  implicit val questionCategoryResponseFormat = Json.format[QuestionCategoryResponse]
  implicit  val questionResponseFormat = Json.format[QuestionResponse]
  implicit val questionFormat = Json.format[Question]
  implicit val categoryFormat = Json.format[Category]
  implicit val userFormat = Json.format[User]
  implicit val signUpFormat = Json.format[SignUp]
  implicit val answerFormat = Json.format[Answer]
  implicit val setFormat = Json.format[Sets]
  implicit val responseMessageFormat = Json.format[ResponseMessage]
  implicit val questionSetFormatter = Json.format[QuestionSet]


  implicit def longListToString = MappedColumnType.base[List[IdType], String](
    list => list mkString ",",
    str =>
      if (str.length > 1) {(str split "," map(_.toLong)).toList}
      else if (str.length == 1) {List(str.toLong)}
      else Nil

  )
  implicit def stringListToString = MappedColumnType.base[List[String], String](
    list => list mkString ",",
    str => (str split ",").toList
  )
  implicit def intListToString = MappedColumnType.base[List[Int], String](
    list => list mkString ",",
    str => (str split "," map Integer.parseInt).toList
  )

}
