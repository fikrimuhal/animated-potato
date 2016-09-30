package controllers

import models.{ClaimData, Participant, Participants, ResponseMessage}
import play.api.libs.json.Json
import play.api.mvc._
import utils.Formatter._
import pdi.jwt._
import utils.Constants

class ParticipantController extends Controller with Secured {


  def index = Action{
    Ok("READY!")
  }


  def insert = Action { implicit request =>
    try {
      val participant: Participant = request.body.asJson.get.as[Participant]
      if (Participants.insert(participant)) Ok("1") else BadRequest("-1")
    }
    catch {
      case e: Exception => BadRequest("-1")
    }
  }

  def update = UserAction(parse.json) { implicit request =>

    val claimData = request.jwtSession.getAs[ClaimData]("user").get

    request.body.validate[Participant].asOpt match {

      case Some(participant) =>
        if(claimData.email == participant.email){
          Participants.update(participant)
          Ok(Json.toJson(ResponseMessage(Constants.OK, Constants.OK_MESSAGE)))
        }
        else Unauthorized("Unauthorized Access")
      case _ => BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))

    }
  }

    def delete = Admin { implicit request =>
      try {
        val participant = request.body.asJson.get.as[Participant]

        if (Participants.delete(participant))
          Ok(Json.toJson(ResponseMessage(Constants.OK, Constants.OK_MESSAGE)))
        else
          BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))
      }
      catch {
        case e: Exception => BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))
      }
    }


    def getAll = Action {
      Ok(Json.toJson(Participants.getAll))
    }

    def getApplicants = Admin {

      Ok(Json.toJson(Participants.getApplicants))

    }

  }