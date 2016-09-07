package controllers

import models.{ResponseMessage, Scores, ScoresDAO}
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import utils.Constants
import utils.Formatter._


class ScoresController extends Controller {


  def insert(scores: Scores) = Action { implicit request =>

    request.body.asJson.flatMap(_.validate[Scores].asOpt) match {

      case Some(scores) =>

        if (ScoresDAO.insert(scores)) {
          Ok(Json.toJson(ResponseMessage(Constants.OK, Constants.OK_MESSAGE)))
        }
        else {
          InternalServerError(Json.toJson(ResponseMessage(Constants.FAIL, Constants.SERVER_ERROR_MESSAGE)))
        }

      case _ =>
        BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))
    }
  }

  def getAll = Action {

    Ok(Json.toJson(ScoresDAO.getAll))

  }
}
