package controllers

import javax.inject.Inject

import models.{QuestionOption, QuestionOptions}
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import utils.Formatter._

/**
  * Created by who on 08.08.2016.
  */
class QuestionOptionController @Inject()  extends Controller{

  def insertQuestionOption() = Action { implicit request =>
    try {
      val question: QuestionOption = request.body.asJson.get.as[QuestionOption]
      if (QuestionOptions.insert(question)) Ok("1") else BadRequest("-1")
    }
    catch {
      case e: Exception => BadRequest(s"-1 $e")
    }
  }

  def updateQuestionOption() = Action{ implicit request =>
    try {
      val question: QuestionOption = request.body.asJson.get.as[QuestionOption]
      if (QuestionOptions.update(question)) Ok("1") else BadRequest("-1")
    }
    catch {
      case e: Exception => BadRequest("-1")
    }
  }

  def deleteQuestionOption() = Action{ implicit request =>
    try {
      val question : QuestionOption= request.body.asJson.get.as[QuestionOption]
      if (QuestionOptions.delete(question)) Ok("1") else BadRequest("-1")
    }
    catch {
      case e: Exception => BadRequest("-1")
    }
  }

  def getQuestionOptions() = Action{
    try {Ok(Json.toJson(QuestionOptions.getQuestionOptions()))}
    catch {case e: Exception => BadRequest("-1")}
  }

}

