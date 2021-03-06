package controllers

import animatedPotato.protocol.protocol.IdType
import dao.CollectionDAO
import models._
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller, Result}
import utils.Formatter._
import utils.{Constants, ID, ResponseMessage}

class CollectionController extends Controller {

  val CollectionDAO = new CollectionDAO

  def insert = evalOperation(CollectionDAO.insert)

  def update = evalOperation(CollectionDAO.update)

  def delete = evalOperation(CollectionDAO.delete)

  def evalOperation(function: Collection => IdType) = Action { implicit request =>

    request.body.asJson.flatMap(_.validate[Collection].asOpt) match {

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

  def getAll = Action {
    Ok(Json.toJson(CollectionDAO.getAllDetailed))
  }

  def setDefaultQuestionSet = Action { implicit request =>

    request.body.asJson.flatMap(_.validate[ID].asOpt) match {

      case Some(id) =>
        if (CollectionDAO.setDefaultCollection(id.id))
        Ok(Json.toJson(ResponseMessage(Constants.OK, Constants.OK_MESSAGE)))
        else {
          InternalServerError(Json.toJson(ResponseMessage(Constants.FAIL, Constants.SERVER_ERROR_MESSAGE)))
        }
      case _ =>
        BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))

    }
  }

}
