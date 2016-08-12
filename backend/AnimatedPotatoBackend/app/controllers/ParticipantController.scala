package controllers

import scala.concurrent.duration._
import akka.util.Timeout
import akka.pattern.ask
import models.{Participant, ParticipantResponse, Participants}
import play.api.libs.json.{JsArray, JsObject, JsValue, Json}
import play.api.mvc._
import utils.Formatter._
import javax.inject.{Inject, Named}

import akka.actor.{Actor, ActorRef}

class ParticipantController @Inject()(@Named("root") root: ActorRef) extends Controller with Secured {

  import scala.concurrent.ExecutionContext.Implicits.global

  implicit val defaultTimeOut = Timeout(2 seconds)

  def index = Action/*.async*/ {
    Ok("READYs")
//    root ! 123
//    root ! "Merhaba"
//    (root ? "Merhaba").mapTo[String].map { response => Ok(response) }

  }

  def insertParticipant() = Action { implicit request =>
    try {
      val participant: Participant = request.body.asJson.get.as[Participant]
      if (Participants.insert(participant)) Ok("1") else BadRequest("-1")
    }
    catch {
      case e: Exception => BadRequest("-1")
    }
  }

  def updateParticipant() = Action(parse.json) {
    _.body.
      validate[Participant].asOpt.
      filter(Participants.update).
      map(x => Ok("1")).
      getOrElse(BadRequest("-1"))
  }

  def deleteParticipant() = Admin { implicit request =>
    try {
      val participant = request.body.asJson.get.as[Participant]
      if (Participants.delete(participant)) Ok("1") else BadRequest("-1")
    }
    catch {
      case e: Exception => BadRequest("-1")
    }
  }

  def getParticipantswithPage(n: String) = Action {
    try {
      Ok(Json.toJson(Participants.getParticipantsWithPage(n.toInt)))
    }
    catch {
      case e: Exception => BadRequest("-1")
    }
  }

  def getParticipants() = Action {
    Ok(Json.prettyPrint(Json.toJson(Participants.getParticipants())))
  }

}