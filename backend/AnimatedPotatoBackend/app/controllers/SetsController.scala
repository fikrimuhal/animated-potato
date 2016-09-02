package controllers

import animatedPotato.protocol.protocol.IdType
import models.{ID, ResponseMessage, Sets, SetsDAO}
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import utils.Formatter._
import utils.Constants


/**
  * Created by who on 09.08.2016.
  */
class SetsController extends Controller {

  def insert() = evalOperation(SetsDAO.insert)

  def update() = evalOperation(SetsDAO.update)

  def delete() = evalOperation(SetsDAO.delete)

  def evalOperation(function: Sets => IdType) = Action { implicit request =>

    request.body.asJson.flatMap(_.validate[Sets].asOpt) match {

      case Some(questionSet) =>
        val id = function(questionSet)
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

  def getAll() = Action {
    Ok(Json.toJson(SetsDAO.getAll))
  }

  def setDefaultQuestionSet(id: ID) = Action { implicit request =>

    request.body.asJson.flatMap(_.validate[ID].asOpt) match {

      case Some(id) =>
        SetsDAO.changeDefaultSet(id.id)
        Ok(Json.toJson(ResponseMessage(Constants.OK, Constants.OK_MESSAGE)))

      case _ =>
        BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))

    }


  }

}
