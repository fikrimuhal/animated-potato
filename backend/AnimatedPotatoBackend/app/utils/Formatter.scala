package utils

import animatedPotato.protocol.protocol.{Answer => _, Category => _, Question => _, QuestionCategory => _, QuestionOption => _, _}
import controllers.{NextQuestionRequest, NextQuestionResponse, TestRequest}
import models._
import play.api.libs.json.Json

import slick.driver.PostgresDriver.simple._


object Formatter {
  implicit val participantFormat = Json.format[Participant]
  implicit val questionOptionFormat = Json.format[QuestionOption]
  implicit val participantResponseFormat = Json.format[ParticipantResponse]
  implicit val questionCategoryFormat = Json.format[QuestionCategory]
  implicit val questionCategoryRequestFormat = Json.format[QuestionCategoryRequest]
  implicit val questionCategoryResponseFormat = Json.format[QuestionCategoryResponse]
  implicit val questionResponseFormat = Json.format[QuestionResponse]
  implicit val testRequestFormat = Json.format[TestRequest]
  implicit val yesNoAnswerFormat = Json.format[YesNoAnswer]
  implicit val getNextQuestionFormat = Json.format[NextQuestionRequest]
  implicit val questionFormat = Json.format[Question]
  implicit val categoryFormat = Json.format[Category]
  implicit val userFormat = Json.format[User]
  implicit val signUpFormat = Json.format[SignUp]
  implicit val answerFormat = Json.format[Answer]
  implicit val responseMessageFormat = Json.format[ResponseMessage]
  implicit val questionSetFormatter = Json.format[QuestionSet]
  implicit val interviewFormatter = Json.format[Interview]
  implicit val testReportRequestFormat = Json.format[TestReportRequest]
  implicit val collectionFormat = Json.format[Collection]
  implicit val collectionResponseFormat = Json.format[CollectionResponse]
  implicit val userDetailsFormat = Json.format[UserDetails]
  implicit val nextQuestionRepsonseFormat = Json.format[NextQuestionResponse]
  implicit val scoresFormat = Json.format[Scores]


  implicit def longListToString = MappedColumnType.base[List[IdType], String](
    list => list mkString ",",
    str =>
      if (str.length > 1) {
        (str split "," map (_.toLong)).toList
      }
      else if (str.length == 1) {
        List(str.toLong)
      }
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
