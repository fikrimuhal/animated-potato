package controllers

import utils.Formatter._
import javax.inject.Inject

import models._
import play.api.libs.json.Json
import play.api.mvc.Controller
import play.api.mvc._

import pdi.jwt._
/**
  * Created by who on 08.08.2016.
  */
class QuestionController @Inject() extends Controller {

  def insertQuestion() = Action { implicit request =>
    try {
      val question: Question= request.body.asJson.get.as[Question]
      if (Questions.insert(question)) Ok("1") else BadRequest("-1")
    }
    catch {
      case e: Exception => BadRequest(s"-1 $e")
    }
  }

  def updateQuestion() = Action { implicit request =>
    try {
      val question = request.body.asJson.get.as[Question]
      if (Questions.update(question)) Ok("1") else BadRequest("-1")
    }
    catch {
      case e: Exception => BadRequest("-1")
    }
  }

  def deleteQuestion() = Action { implicit request =>
    try {
      val question: Question = request.body.asJson.get.as[Question]
      if (Questions.delete(question)) Ok("1") else BadRequest("-1")
    }
    catch {
      case e: Exception => BadRequest("-1")
    }
  }

  def getQuestionById(id: String) = Action {
    try {
      val question: Question = Questions.getQuestionById(id.toInt)
      if (question.id == Some(-1)) BadRequest("-1")
      else Ok(Json.toJson(Questions.getQuestionById(id.toInt)))
    }
    catch {
      case e: Exception => BadRequest("-1")
    }
  }
  def getQuestions = Action {
   Ok(Json.toJson(Questions.getAll))
  }

}
