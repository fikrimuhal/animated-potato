package controllers

import models.{QuestionSet, QuestionSetDAO, ResponseMessage}
import play.api.libs.json.{Json, Writes}
import play.api.mvc.{Action, Controller}
import utils.Formatter._
import utils.Constants

import scala.reflect.ClassTag

/**
  * Created by who on 09.08.2016.
  */
class QuestionSetController extends Controller {


  def insert(questionSet: QuestionSet) = Action { implicit request =>

    request.body.asJson.flatMap(_.validate[QuestionSet].asOpt) match {

      case Some(obj) =>

        if (QuestionSetDAO.insert(obj)) {
          Ok(Json.toJson(ResponseMessage(Constants.OK, Constants.OK_MESSAGE)))
        }
        else {
          InternalServerError(Json.toJson(ResponseMessage(Constants.FAIL, Constants.SERVER_ERROR_MESSAGE)))
        }

      case _ =>
        BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))
    }
  }

  def get() = Action {

    Ok(Json.toJson(QuestionSetDAO.getAll))

  }
}
