package controllers

import models.{ResponseMessage, Sets, SetsDAO}
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

  def get() = Action{

   Ok(Json.toJson(SetsDAO.getAllSets()))

  }
  def evalOperation[T](crud : Sets => Boolean) = Action { implicit request =>

    request.body.asJson.flatMap(_.validate[Sets].asOpt) match {

      case Some(questionSet) if crud(questionSet) =>
        Ok(Json.toJson(ResponseMessage(Constants.OK,Constants.OK_MESSAGE)))

      case Some(_) =>
        InternalServerError(Json.toJson(ResponseMessage(Constants.FAIL,Constants.SERVER_ERROR_MESSAGE)))

      case _ =>
        BadRequest(Json.toJson(ResponseMessage(Constants.FAIL,Constants.UNEXPECTED_ERROR_MESSAGE)))
    }
  }
}
