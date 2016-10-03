package controllers

import core.Jwt
import models.{ClaimData, Participant, ParticipantDAO}
import play.api.libs.json.Json
import play.api.mvc._
import utils.Formatter._
import pdi.jwt._
import utils.{Constants, ResponseMessage}


class ParticipantController extends Controller with Jwt {


  def index = Action{
    Ok("READY!")
  }

  def update = UserAction(parse.json) { implicit request =>

    val claimData = request.jwtSession.getAs[ClaimData](Constants.CLAIM_DATA_KEY).get

    request.body.validate[Participant].asOpt match {

      case Some(participant) =>
        if(claimData.email == participant.email){
          ParticipantDAO.update(participant)
          Ok(Json.toJson(ResponseMessage(Constants.OK, Constants.OK_MESSAGE)))
        }
        else Unauthorized(Json.toJson(ResponseMessage(Constants.UNAUTHORIZED,Constants.UNAUTHORIZED_ACCESS)))
      case _ => BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))

    }
  }


    def getApplicants = Action {

      Ok(Json.toJson(ParticipantDAO.getApplicants))

    }

  }