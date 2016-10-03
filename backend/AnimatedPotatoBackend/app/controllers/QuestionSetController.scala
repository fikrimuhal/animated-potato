package controllers

import models.{QuestionSet, QuestionSetDAO}
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import utils.Formatter._
import utils.{Constants, ResponseMessage}

class QuestionSetController extends Controller {

  def insert(questionSet: QuestionSet) = Action { implicit request =>

    request.body.asJson.flatMap(_.validate[QuestionSet].asOpt) match {

      case Some(questionSet) =>

        if (QuestionSetDAO.insert(questionSet)) {
          Ok(Json.toJson(ResponseMessage(Constants.OK, Constants.OK_MESSAGE)))
        }
        else {
          InternalServerError(Json.toJson(ResponseMessage(Constants.FAIL, Constants.SERVER_ERROR_MESSAGE)))
        }

      case _ =>
        BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))
    }
  }

  def get = Action {

    Ok(Json.toJson(QuestionSetDAO.getAll()))

  }
}
