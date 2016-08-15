package controllers

import models.{Answer, Answers, Categories, Category}
import play.api.mvc.{Action, Controller}
import utils.Formatter._
/**
  * Created by who on 11.08.2016.
  */
class AnswerController extends Controller {

  def insertAnswer() = Action{implicit request =>
    try {
      val answer: Answer = request.body.asJson.get.as[Answer]
      if (Answers.insert(answer)) Ok("1") else BadRequest("-1")
    }
    catch {
      case e: Exception => BadRequest("-1")
    }
  }

}
