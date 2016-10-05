package controllers

import core.Jwt
import models.{Participant, ParticipantDAO}
import play.api.libs.json.Json
import play.api.mvc._
import utils.Formatter._
import utils.{Constants, ResponseMessage}

class ParticipantController extends Controller with Jwt {

  def index = Action { implicit  request =>
    Ok("READY!")
  }

  def update = UserAction(parse.json) { implicit request =>

    request.body.validate[Participant].asOpt match {

      case Some(participant) =>

        if (ParticipantDAO.update(participant))
          Ok(Json.toJson(ResponseMessage(Constants.OK, Constants.OK_MESSAGE)))

        else InternalServerError(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))

      case _ => BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))

    }
  }

  def getApplicants = Admin {

    Ok(Json.toJson(ParticipantDAO.getApplicants))

  }

}