package controllers

import models.{ResponseMessage, QuestionSet, QuestionSets}
import play.api.libs.json.{Json, Writes}
import play.api.mvc.{Action, Controller}
import utils.Formatter._
import utils.Constants

import scala.reflect.ClassTag

/**
  * Created by who on 09.08.2016.
  */
class QuestionSetController extends Controller {

  def insert() = evalOperation(QuestionSets.insert)

  def update() = evalOperation(QuestionSets.update)

  def delete() = evalOperation(QuestionSets.delete)

  def get() = Action{

   Ok(Json.toJson(QuestionSets.getAllSets()))

  }
  def evalOperation[T](crud : QuestionSet => Boolean) = Action { implicit request =>

    request.body.asJson.flatMap(_.validate[QuestionSet].asOpt) match {

      case Some(obj) if crud(obj) =>
        Ok(Json.toJson(ResponseMessage(Constants.OK,Constants.OK_MESSAGE)))

      case Some(_) =>
        InternalServerError(Json.toJson(ResponseMessage(Constants.FAIL,Constants.SERVER_ERROR_MESSAGE)))

      case _ =>
        BadRequest(Json.toJson(ResponseMessage(Constants.FAIL,Constants.UNEXPECTED_ERROR_MESSAGE)))
    }
  }
}
