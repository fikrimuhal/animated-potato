package controllers

import animatedPotato.protocol.protocol._
import core.Jwt
import dao.CategoryDAO
import models.Category
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import utils.{Constants, ResponseMessage}
import utils.Formatter._

class CategoryController extends Controller with Jwt {
  val CategoryDAO = new CategoryDAO

  def insert = evalOperation(CategoryDAO.insert)

  def update = evalOperation(CategoryDAO.update)

  def delete = evalOperation(CategoryDAO.delete)

  def get(id: Long) = Admin {
    Ok(Json.toJson(CategoryDAO.getById(id)))
  }

  def getAll = Admin {
    Ok(Json.toJson(CategoryDAO.getAll))
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
