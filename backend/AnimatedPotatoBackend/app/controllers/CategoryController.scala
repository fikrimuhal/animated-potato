package controllers

import animatedPotato.protocol.protocol._
import dao.CategoryDAO
import models.{Category, ResponseMessage}
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import utils.Constants
import utils.Formatter._

class CategoryController extends Controller with Secured {
  val categoryDAO = new CategoryDAO

  def insert = evalOperation(categoryDAO.insert)

  def update = evalOperation(categoryDAO.update)

  def delete = evalOperation(categoryDAO.delete)

  def get(id: Long) = Action {
    Ok(Json.toJson(categoryDAO.getById(id)))
  }

  def getAll = Admin {
    Ok(Json.toJson(categoryDAO.getAll))
  }

  def evalOperation(function: Category => IdType) = Action { implicit request =>

    request.body.asJson.flatMap(_.validate[Category].asOpt) match {

      case Some(category) =>
        val id = function(category)
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
