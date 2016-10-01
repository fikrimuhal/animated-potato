package controllers

import utils.Formatter._
import javax.inject.Inject

import animatedPotato.protocol.protocol.{Question => _, _}
import models._
import play.api.libs.json.Json
import play.api.mvc.Controller
import play.api.mvc._
import utils.{Constants, ID, ResponseMessage}

class QuestionController @Inject() extends Controller {

  def insert() = evalOperation(Questions.insert)

  def update() = evalOperation(Questions.update)

  def delete() =Action { implicit request =>

    request.body.asJson.flatMap(_.validate[ID].asOpt) match {

      case Some(id) =>
        if (Questions.deleteById(id.id) > 0) {
          Ok(Json.toJson(ResponseMessage(Constants.OK, Constants.OK_MESSAGE)))
        }
        else {
          InternalServerError(Json.toJson(ResponseMessage(Constants.FAIL, Constants.SERVER_ERROR_MESSAGE)))
        }
      case _ =>
        BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))
    }
  }

  def getById(id: String) = Action {

    Questions.getQuestionById(id.toLong) match {

      case Some(question) => Ok(Json.toJson(question))

      case None => Ok(Json.toJson(ResponseMessage(Constants.FAIL,"Bu ID ile kayıtlı soru bulunmamaktadır")))

    }
  }

  def getAll = Action {
    Ok(Json.toJson(Questions.getAll))
  }

  def evalOperation(function: Question => IdType) = Action { implicit request =>

    request.body.asJson.flatMap(_.validate[Question].asOpt) match {

      case Some(question) =>
        val id = function(question)
        if (id > 0) {
          Ok(Json.toJson(ResponseMessage(Constants.OK, Constants.OK_MESSAGE, Some(id))))
        }
        else {
          InternalServerError(Json.toJson(ResponseMessage(Constants.FAIL, Constants.SERVER_ERROR_MESSAGE)))
        }
      case _ =>
        BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))
    }
  }
}

