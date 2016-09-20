package controllers

import animatedPotato.protocol.protocol.IdType
import dao.AnswerDAO
import models.{Answer, ResponseMessage}
import play.api.mvc.{Action, Controller}
import utils.Formatter._
import play.api.libs.json.Json
import utils.Constants

class AnswerController extends Controller with Secured {

  lazy val AnswerDAO = new AnswerDAO

  def insert = evalOperation(AnswerDAO.insert)
  def update = evalOperation(AnswerDAO.update)
  def delete = evalOperation(AnswerDAO.delete)

  def getAnswers = Action{implicit request =>
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
}
