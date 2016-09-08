package controllers

import javax.inject.{Inject, Named}
import akka.pattern._
import akka.actor.ActorRef
import akka.util.Timeout
import animatedPotato.protocol.protocol.{Question => _, _}
import com.google.inject.Singleton
import play.api.libs.json.Json
import models._
import models.Category
import play.api.mvc.{Action, Controller}
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

case class NextQuestionRequest(answer: YesNoAnswer, interviewId: InterviewId, email: Option[String] = None, userId: Option[UserIdType])

case class NextQuestionResponse(status: String, interviewId: InterviewId, remainingQuestion: Int, question: Option[QuestionResponse], testOver: Boolean, isRegistered: Boolean)

case class CategoryScore(category: Category, score: Score)

case class ComparativeReport(userScore: List[CategoryScore], personnelAverage: List[CategoryScore], overallAverage: List[CategoryScore])

case object RandomInterviewImpl

case class KillActor(interviewId: InterviewId)

@Singleton
class InterviewController @Inject()(@Named("root") rootActor: ActorRef) extends Controller {
  final val INTERVIEW_IMPL = RandomInterviewImpl
  final val TEST_IS_NOT_OVER = false
  final val TEST_IS_OVER = true

  import play.api.libs.concurrent.Execution.Implicits.defaultContext

  implicit val defaultTimeOut = Timeout(2 seconds)

  def startTest() = Action.async { implicit request =>
    println("InterviewController : received a startTest request")
    request.body.asJson.flatMap(_.validate[TestRequest].asOpt) match {

      case Some(testRequest) =>
        InterviewDAO.insert(testRequest.email) match {

          case Left(_) =>
            Future.successful(Ok(Json.toJson(ResponseMessage(Constants.FAIL, Constants.TEST_HAS_SOLVED_BEFORE))))

          case Right(interviewId) =>
            (rootActor ? (INTERVIEW_IMPL, TestStart(interviewId, Left(testRequest.email))))
              .mapTo[NextQuestion]
              .map { response =>
                Ok(Json.toJson(NextQuestionResponse(Constants.OK,
                  interviewId,
                  response.remainingQuestions,
                  Questions.getQuestionById(response.questionId),
                  TEST_IS_NOT_OVER,
                  Users.get(testRequest.email).isDefined)))
              }
        }

      case _ =>
        Future.successful(BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE))))

    }
  }

  def nextQuestion = Action.async { implicit request =>
    println("InterviewController : received a nextQuestion request")
    request.body.asJson.flatMap(_.validate[NextQuestionRequest].asOpt) match {

      case Some(data) =>

        Answers.insert(Answer(None, data.answer.questionId, data.userId, data.interviewId, data.email, data.answer.value))

        (rootActor ? (RandomInterviewImpl, GetNextQuestion(Some(data.answer), data.interviewId)))
          .map {

            case NextQuestion(questionId, interviewId, remainingQuestions) =>
              Ok(Json.toJson(NextQuestionResponse(Constants.OK,
                interviewId,
                remainingQuestions,
                Questions.getQuestionById(questionId),
                TEST_IS_NOT_OVER,
                Users.get(data.email.get).isDefined)))

            case testFinish: TestFinish =>
              InterviewDAO.finishTest(Right(testFinish.interviewId))
              Ok(Json.toJson(NextQuestionResponse(Constants.OK, testFinish.interviewId, 0, None, TEST_IS_OVER, Users.get(data.email.get).isDefined)))
          }

      case _ => Future.successful(BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE))))

    }
  }

  def testReport = Action { implicit request =>
    println("InterviewController : received a testReport request")

    request.body.asJson.flatMap(_.validate[TestReportRequest].asOpt) match {

      case Some(request) => Ok(Json.toJson(ScoresDAO.getAll))

      case _ => BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))

    }
  }

  def listAll = Action {
    Ok(Json.toJson(InterviewDAO.getAll))
  }

}


