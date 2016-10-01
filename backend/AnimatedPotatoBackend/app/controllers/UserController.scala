package controllers

import models.User
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import utils.{Constants, ID, ResponseMessage}
import utils.Formatter._
import dao.UserDAO

/**
  * Created by who on 23.08.2016.
  */
class UserController extends Controller {

  final val UserDAO = new UserDAO

  def insert = Action { implicit request =>

    request.body.asJson.flatMap(_.validate[User].asOpt) match {

      case Some(user) =>
        val id = UserDAO.insert(user)
        if (id > 0) {
          Ok(Json.toJson(ResponseMessage(Constants.OK, Constants.OK_MESSAGE, Some(id))))
        }
        else InternalServerError(Json.toJson(ResponseMessage(Constants.FAIL, Constants.SERVER_ERROR_MESSAGE)))

      case _ => BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))
    }

  }


  def update = Action { implicit request =>

    request.body.asJson.flatMap(_.validate[User].asOpt) match {

      case Some(user) =>
        if (UserDAO.update(user) == 1) {
          Ok(Json.toJson(ResponseMessage(Constants.OK, Constants.OK_MESSAGE)))
        }
        else InternalServerError(Json.toJson(ResponseMessage(Constants.FAIL, Constants.SERVER_ERROR_MESSAGE)))

      case _ => BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))
    }

  }

  def delete = Action { implicit request =>

    request.body.asJson.flatMap(_.validate[User].asOpt) match {

      case Some(user) =>
        if (UserDAO.delete(user) == 1) {
          Ok(Json.toJson(ResponseMessage(Constants.OK, Constants.OK_MESSAGE)))
        }
        else InternalServerError(Json.toJson(ResponseMessage(Constants.FAIL, Constants.SERVER_ERROR_MESSAGE)))

      case _ => BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))
    }
  }

  def getUsers = Action {
    Ok(Json.toJson(UserDAO.getAll))
  }

  def getUsersDetailed = Action {

    Ok(Json.toJson(UserDAO.getUsersDetailed))

  }

  def getPersonnelsDetailed = Action {
    Ok(Json.toJson(UserDAO.getPersonnelsDetailed))
  }

  def getAdminsDetailed = Action {
    Ok(Json.toJson(UserDAO.getAdminsDetailed))
  }

  def makeAdmin = Action { implicit request =>

    request.body.asJson.flatMap(_.validate[ID].asOpt) match {

      case Some(id) =>

        if (UserDAO.makeAdmin(id.id)) {
          Ok(Json.toJson(ResponseMessage(Constants.OK, Constants.OK_MESSAGE)))
        }
        else InternalServerError(Json.toJson(ResponseMessage(Constants.FAIL, Constants.SERVER_ERROR_MESSAGE)))

      case _ => BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))
    }
  }

  def makePersonnel = Action { implicit request =>

    request.body.asJson.flatMap(_.validate[ID].asOpt) match {

      case Some(id) =>

        if (UserDAO.makePersonnel(id.id)) {
          Ok(Json.toJson(ResponseMessage(Constants.OK, Constants.OK_MESSAGE)))
        }
        else InternalServerError(Json.toJson(ResponseMessage(Constants.FAIL, Constants.SERVER_ERROR_MESSAGE)))

      case _ => BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))
    }
  }


  def makeUnPersonnel = Action { implicit request =>

    request.body.asJson.flatMap(_.validate[ID].asOpt) match {

      case Some(id) =>

        if (UserDAO.makeUnPersonnel(id.id)) {
          Ok(Json.toJson(ResponseMessage(Constants.OK, Constants.OK_MESSAGE)))
        }
        else InternalServerError(Json.toJson(ResponseMessage(Constants.FAIL, Constants.SERVER_ERROR_MESSAGE)))

      case _ => BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))
    }
  }

  def makeUnadmin = Action { implicit request =>

    request.body.asJson.flatMap(_.validate[ID].asOpt) match {

      case Some(id) =>

        if (UserDAO.makeUnadmin(id.id)) {
          Ok(Json.toJson(ResponseMessage(Constants.OK, Constants.OK_MESSAGE)))
        }
        else InternalServerError(Json.toJson(ResponseMessage(Constants.FAIL, Constants.SERVER_ERROR_MESSAGE)))

      case _ => BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))
    }
  }
}