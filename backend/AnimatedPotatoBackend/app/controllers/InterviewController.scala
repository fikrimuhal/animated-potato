package controllers

import javax.inject.{Inject, Named}

import akka.pattern._
import akka.actor.{ActorRef, ActorSelection, Kill}
import akka.util.Timeout
import animatedPotato.protocol.protocol.{Question => _, _}
import com.google.inject.Singleton
import play.api.libs.json.Json
import models._
import play.api.mvc.{Action, Controller, Result}
import models.Answer
import scala.concurrent.duration._
import scala.concurrent.Future
import utils.Constants
import utils.Formatter._

/**
  * Created by who on 10.08.2016.
  */
case class Email(email: String)

case class TestRequest(email: String, restrictedCategoryList: Option[List[CategoryId]])

case class InterviewStartResponse(valid: Boolean, firstQuestion: Option[Question], remainingQuestion: Option[Int])

case class NextQuestionRequest(answer: YesNoAnswer, interviewId: InterviewId,email : Option[String] = None, userId : Option[UserIdType])

case object Interview

case class KillActor(interviewId: InterviewId)

@Singleton
class InterviewController @Inject()(@Named("root") rootActor: ActorRef) extends Controller {

  import play.api.libs.concurrent.Execution.Implicits.defaultContext

  implicit val defaultTimeOut = Timeout(2 seconds)

  def startTest() = Action.async { implicit request =>

    println("InterviewController : received a startTest request")
    request.body.asJson.flatMap(_.validate[TestRequest].asOpt) match {

      case Some(testRequest) =>
        InterviewDAO.insert(testRequest.email) match {

          case Left(_) =>
            Future {}.map(response => Ok(Json.toJson(ResponseMessage(Constants.FAIL, "Daha önceden testi çözmüşsün"))))

          case Right(interviewId) =>
            (rootActor ? (Interview, TestStart(interviewId, Left(testRequest.email))))
              .mapTo[NextQuestion]
              .map(response =>
                Ok(Json.toJson(Questions.getQuestionById(response.questionId)))
              )
        }

      case _ =>
        Future.successful(BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE))))

    }
  }

  def nextQuestion = Action.async { implicit request =>
    println("InterviewController : received a nextQuestion request")
    request.body.asJson.flatMap(_.validate[NextQuestionRequest].asOpt) match {

      case Some(data) =>

       Answers.insert(Answer(None,data.answer.questionId, data.userId,data.interviewId,data.email,data.answer.value))

        (rootActor ? (Interview, GetNextQuestion(Some(data.answer), data.interviewId)))
          .map {
            case NextQuestion(questionId, _) =>
              Ok(Json.toJson(Questions.getQuestionById(questionId)))
            case testFinish: TestFinish =>
              InterviewDAO.finishTest(Right(testFinish.interviewId))
              Ok(s"test finiş ${testFinish.interviewId}, ${testFinish.userIdentifier}")
          }

      case _ => Future.successful(BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE))))

    }
  }

  def testReport = Action.async { implicit request =>
    println("InterviewController : received a testReport request")

    request.body.asJson.flatMap(_.validate[TestReportRequest].asOpt) match {

      case Some(testReportRequest) =>

        //TODO : Test Report requesti geldiğinde, daha önceden test finish olduğunda hesaplanıp değeri girilen tablodan çek

        (rootActor ? (Interview, testReportRequest))
          .mapTo[TestReport]
          .map(x => Ok(s"TestReport : ${x.interviewId} : ${x.scores} : ${x.userIdentifier}"))
      case _ => Future.successful(BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE))))

    }
  }

  def listAll = Action {
    Ok(Json.toJson(InterviewDAO.getAll))
  }

}


