package utils

import models._
import play.api.libs.json.Json
import slick.driver.PostgresDriver.simple._


object Formatter {
  implicit  val participantFormat = Json.format[Participant]
  implicit  val questionOptionFormat = Json.format[QuestionOption]
  implicit  val questionOptionListFormat = Json.format[QuestionOptionList]
  implicit val participantResponseFormat = Json.format[ParticipantResponse]
  implicit val questionResponseFormat = Json.format[QuestionResponse]
  implicit val questionFormat = Json.format[Question]
  implicit val categoryFormat = Json.format[Category]
  implicit def intListToString = MappedColumnType.base[List[Int], String](
    list => list mkString ",",
    str => (str split "," map Integer.parseInt).toList
  )
  implicit def stringListToString = MappedColumnType.base[List[String], String](
    list => list mkString ",",
    str => (str split ",").toList
  )


}
