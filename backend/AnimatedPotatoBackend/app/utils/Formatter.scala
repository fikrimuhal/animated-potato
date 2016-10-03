package utils


import java.sql.Timestamp
import java.text.SimpleDateFormat

import animatedPotato.protocol.protocol.{Answer => _, Category => _, Question => _, QuestionCategory => _, QuestionOption => _, _}
import controllers._
import models.{CategoryResults, _}
import play.api.libs.json._
import controllers.Email
import dao.{CollectionResponse, InterviewAnswers, QuestionAnswer, UserDetails}

import slick.driver.PostgresDriver.simple._


object Formatter {
  implicit val participantFormat = Json.format[Participant]
  implicit val questionOptionFormat = Json.format[QuestionOption]
  implicit val participantResponseFormat = Json.format[ParticipantResponse]
  implicit val questionCategoryFormat = Json.format[QuestionCategory]
  implicit val questionCategoryRequestFormat = Json.format[QuestionCategoryRequest]
  implicit val collectionFormat = Json.format[Collection]
  implicit val questionCategoryResponseFormat = Json.format[QuestionCategoryResponse]
  implicit val questionResponseFormat = Json.format[QuestionResponse]
  implicit val testRequestFormat = Json.format[TestRequest]
  implicit val yesNoAnswerFormat = Json.format[YesNoAnswer]
  implicit val getNextQuestionFormat = Json.format[NextQuestionRequest]
  implicit val questionFormat = Json.format[Question]
  implicit val categoryFormat = Json.format[Category]
  implicit val userFormat = Json.format[User]
  implicit val signUpFormat = Json.format[SignUpForm]
  implicit val answerFormat = Json.format[Answer]
  implicit val responseMessageFormat = Json.format[ResponseMessage]
  implicit val questionSetFormatter = Json.format[QuestionSet]
  implicit val categoryScoreFormatter = Json.format[CategoryScore]
  implicit val comparativeReportFormatter = Json.format[ComparativeReport]
  implicit val emailFormatter = Json.format[Email]
  implicit val claimDataFormatter = Json.format[ClaimData]
  implicit object timestampFormat extends Format[Timestamp] {
    val format = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss.SS")
    def reads(json: JsValue) = {
      val str = json.as[String]
      JsSuccess(new Timestamp(format.parse(str).getTime))
    }
    def writes(ts: Timestamp) = JsString(format.format(ts))
  }
  implicit val applicantFormatter = Json.format[Applicant]
  implicit val interviewFormatter = Json.format[Interview]
  implicit val testReportRequestFormat = Json.format[TestReportRequest]
  implicit val collectionResponseFormat = Json.format[CollectionResponse]
  implicit val userDetailsFormat = Json.format[UserDetails]
  implicit val nextQuestionRepsonseFormat = Json.format[NextQuestionResponse]
  implicit val scoresFormat = Json.format[Scores]
  implicit val categoryResultsFormatter = Json.format[CategoryResults]
  implicit val categoryResultsResponseFormatter = Json.format[CategoryResultsResponse]
  implicit val userCategoryResultsFormatter = Json.format[UserCategoryScores]
  implicit val getAnswerFormatter = Json.format[GetAnswer]
  implicit val questionTableFormatter = Json.format[QuestionTable]
  implicit val questionAnswerFormatter = Json.format[QuestionAnswer]
  implicit val questionAndAnswerFormatter = Json.format[QuestionAndAnswer]
  implicit val interviewAnswersFormatter = Json.format[InterviewAnswers]
  implicit val interviewResultFormatter = Json.format[InterviewResult]
  implicit val SignUpFailFormat = Json.format[SignFailMessage]
  implicit val SignUpSuccessFormat = Json.format[SignSuccessMessage]
  implicit val loginFormFormat = Json.format[LoginForm]

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
