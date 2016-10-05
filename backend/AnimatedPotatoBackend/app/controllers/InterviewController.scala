package controllers

import javax.inject.{Inject, Named}
import akka.pattern._
import akka.actor.ActorRef
import akka.util.Timeout
import animatedPotato.protocol.protocol.{Question => _, _}
import core.Jwt
import dao.{AnswerDAO, UserDAO}
import play.api.libs.json.Json
import models._
import models.Category
import play.api.mvc.{Action, Controller}
import models.Answer
import scala.concurrent.duration._
import scala.concurrent.Future
import utils.{Constants, ID, ResponseMessage}
import utils.Formatter._
import pdi.jwt._
case class Email(email: String)

case class TestRequest(email: String, restrictedCategoryList: Option[List[CategoryId]])

case class InterviewStartResponse(valid: Boolean, firstQuestion: Option[Question], remainingQuestion: Option[Int])

case class NextQuestionRequest(answer: YesNoAnswer, interviewId: InterviewId, email: Option[String] = None, userId: Option[UserIdType])

case class NextQuestionResponse(status: String, interviewId: InterviewId, remainingQuestion: Int, question: Option[QuestionResponse], testOver: Boolean, isRegistered: Boolean)

case class CategoryScore(category: Category, score: Score, percentage: Option[Score] = None, confidence: Option[Confidence] = None, order: Option[Int] = None)

case class ComparativeReport(userScore: List[CategoryScore], personnelAverage: List[CategoryScore], overallAverage: List[CategoryScore])

case object RandomInterviewImpl

class InterviewController @Inject()(@Named("root") rootActor: ActorRef) extends Controller with Jwt {

  final val INTERVIEW_IMPL = RandomInterviewImpl
  final val TEST_IS_NOT_OVER = false
  final val TEST_IS_OVER = true
  final val UserDAO = new UserDAO

  import play.api.libs.concurrent.Execution.Implicits.defaultContext

  implicit val defaultTimeOut = Timeout(2 seconds)

  def startTest = Action.async { implicit request =>
    println("InterviewController : received a startTest request")
    request.body.asJson.flatMap(_.validate[TestRequest].asOpt) match {

      case Some(testRequest) =>
        val claimDataOpt = request.jwtSession.getAs[ClaimData](Constants.CLAIM_DATA_KEY)
        // girilen mail ile kullanıcı varsa üye girişi yapın mesajı
        val isAnonim = UserDAO.getByEmail(testRequest.email).isEmpty
        // email control with header and body
        val isSafe = claimDataOpt.isDefined && claimDataOpt.get.email == testRequest.email

        if (isAnonim || isSafe) {

          val interviewId = InterviewDAO.insert(testRequest.email)
          (rootActor ? (INTERVIEW_IMPL, TestStart(interviewId, Left(testRequest.email))))
            .mapTo[NextQuestion]
            .map { response =>

              val remainingQuestions = response.remainingQuestions
              val question = Questions.getQuestionById(response.questionId)

              Ok(Json.toJson(NextQuestionResponse(Constants.OK, interviewId, remainingQuestions, question, TEST_IS_NOT_OVER, !isAnonim)))
            }
        }
        else Future.successful(Ok(Json.toJson(
          ResponseMessage(Constants.LOGIN_REQUIRED, Constants.PLEASE_LOG_IN)
        )))

      case _ =>
        Future.successful(BadRequest(Json.toJson(
          ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)
        )))

    }
  }

  def nextQuestion = Action.async { implicit request =>
    println("InterviewController : received a nextQuestion request")

    request.body.asJson.flatMap(_.validate[NextQuestionRequest].asOpt) match {

      case Some(data) =>

        (new AnswerDAO).insert(Answer(None, data.answer.questionId, data.userId, data.interviewId, data.email.get, data.answer.value))

        (rootActor ? (RandomInterviewImpl, GetNextQuestion(Some(data.answer), data.interviewId)))
          .map {

            case NextQuestion(questionId, interviewId, remainingQuestions) =>
              Ok(Json.toJson(NextQuestionResponse(Constants.OK,
                interviewId,
                remainingQuestions,
                Questions.getQuestionById(questionId),
                TEST_IS_NOT_OVER,
                (new UserDAO).getByEmail(data.email.get).isDefined)))

            case testFinish: TestFinish =>
              InterviewDAO.finishTest(Right(testFinish.interviewId))
              Ok(Json.toJson(NextQuestionResponse(Constants.OK, testFinish.interviewId, 0, None, TEST_IS_OVER, (new UserDAO).getByEmail(data.email.get).isDefined)))
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

  def deleteInterview = Admin { implicit request =>

    request.body.asJson.flatMap(_.validate[ID].asOpt) match {

      case Some(id) =>

        if (InterviewDAO.delete(id.id)) {
          Ok(Json.toJson(ResponseMessage(Constants.OK, Constants.OK_MESSAGE)))
        }
        else InternalServerError(Json.toJson(ResponseMessage(Constants.FAIL, Constants.SERVER_ERROR_MESSAGE)))

      case _ => BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))
    }
  }

}
