package controllers

import models._
import play.api.mvc.{Action, Controller}
import utils.Formatter._
import pdi.jwt._

class AnswerController extends Controller with Secured {

  def insertAnswer() = Action { implicit request =>
    try {
      val answer: Answer = request.body.asJson.get.as[Answer]
      if (Answers.insert(answer)) Ok("1") else BadRequest("-1")
    }
    catch {
      case e: Exception => BadRequest("-1")
    }
  }

}
