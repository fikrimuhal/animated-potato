package controllers

import animatedPotato.protocol.protocol.{IdType, QuestionId}
import core.{AdminAction, Jwt}
import dao.AnswerDAO
import models.InterviewDAO.InterviewId
import models._
import play.api.mvc.{Action, Controller}
import utils.Formatter._
import play.api.libs.json.Json
import utils._

case class GetAnswer(interviewId: InterviewId, questionId: QuestionId)

case class QuestionAndAnswer(question: Option[QuestionTable], answer: Option[Answer])

class AnswerController extends Controller with Jwt {

  lazy val AnswerDAO = new AnswerDAO

  def insert = evalOperation(AnswerDAO.insert)

  def update = evalOperation(AnswerDAO.update)

  def delete = evalOperation(AnswerDAO.delete)

  def getAnswers = Admin { implicit request =>
    Ok(Json.toJson(AnswerDAO.getAll))
  }

  def evalOperation(function: Answer => IdType) = Action { implicit request =>

    request.body.asJson.flatMap(_.validate[Answer].asOpt) match {

      case Some(answer) =>
        val id = function(answer)
        if (id > 0) {
          Ok(Json.toJson(ResponseMessage(Constants.OK, Constants.OK_MESSAGE, Some(id))))
        }
        else {
          InternalServerError(Json.toJson(ResponseMessage(Constants.FAIL, Constants.SERVER_ERROR_MESSAGE)))
        }
      case _ =>
        BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))
    }
  }

  /**
    * requires GetAnswer typed JSON in a request body that has two fields : interviewID and questionID
    *
    * @return : Returns
    *         onSuccess :
    *         found : interview answer of specified interviewID and questionID
    *         not_found: message that explains
    *         onFailure : BadRequest Response Message that explains error
    */
  def getAnswer = Admin { implicit request =>

    request.body.asJson.flatMap(_.validate[GetAnswer].asOpt) match {

      case Some(getAnswer) =>
        val questionOption: Option[QuestionTable] = Questions.getQuestionText(getAnswer.questionId)

        val answer = AnswerDAO.get(getAnswer.interviewId, getAnswer.questionId)
        if (answer.isDefined) Ok(Json.toJson(QuestionAndAnswer(questionOption, answer)))
        else Ok(Json.toJson(ResponseMessage(Constants.FAIL, Constants.NOT_EXISTS)))

      case _ =>
        BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))
    }
  }

  /**
    * requires ID typed JSON in a request body that indicates interviewID
    *
    * @return : Returns interview answers of (each personnels and interviewId from request body)
    */
  def getInterviewAnswers = Admin { implicit request =>


    request.body.asJson.flatMap(_.validate[ID].asOpt) match {

      case Some(id) => Ok(Json.toJson(AnswerDAO.getAllQuestionAnswer(id.id)))

      case _ => BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))

    }
  }

}
