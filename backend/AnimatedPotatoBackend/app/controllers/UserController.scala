package controllers

import models.{ID, ResponseMessage, User, Users}
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import utils.Constants
import utils.Formatter._

/**
  * Created by who on 23.08.2016.
  */
class UserController extends Controller {


  def insertUser() = Action { implicit request =>
    try {
      val user: User = request.body.asJson.get.as[User]
      Users.insert(User(username = user.username, password = user.password, email = user.email))
      Ok("1")
    }
    catch {
      case e: Exception => BadRequest(s"-1 $e")
    }
  }

  def updateUser() = Action { implicit request =>
    try {
      val user: User = request.body.asJson.get.as[User]
      if (Users.update(user)) Ok("1") else BadRequest("-1")
    }
    catch {
      case e: Exception => BadRequest("-1")
    }
  }

  def deleteUser() = Action { implicit request =>
    try {
      val user: User = request.body.asJson.get.as[User]
      if (Users.delete(user)) Ok("1") else BadRequest("-1")
    }
    catch {
      case e: Exception => BadRequest("-1")
    }
  }

  def getUser(n: String) = Action {
    try {
      val user = Users.getById(n.toInt)
      if (user.id == Some(-1)) BadRequest("-1")
      else Ok(Json.toJson(user))
    }
    catch {
      case e: Exception => BadRequest("-1")
    }
  }

  def getUsers() = Action {
    try {
      Ok(Json.toJson(Users.getAll))
    }
    catch {
      case e: Exception => BadRequest("-1")
    }
  }

  def getPersonnels = Action {
    Ok(Json.toJson(Users.getPersonnelList))
  }

  def getAdmins = Action {
    Ok(Json.toJson(Users.getAdminList))
  }

  def makeAdmin = Action { implicit request =>

    request.body.asJson.flatMap(_.validate[ID].asOpt) match {

      case Some(id) =>

        if (Users.makeAdmin(id.id)) {
          Ok(Json.toJson(ResponseMessage(Constants.OK, Constants.OK_MESSAGE)))
        }
        else InternalServerError(Json.toJson(ResponseMessage(Constants.FAIL, Constants.SERVER_ERROR_MESSAGE))

      case _ => BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))
    }
  }

  def makePersonnel = Action { implicit request =>

    request.body.asJson.flatMap(_.validate[ID].asOpt) match {

      case Some(id) =>

        if (Users.makePersonnel(id.id)) {
          Ok(Json.toJson(ResponseMessage(Constants.OK, Constants.OK_MESSAGE)))
        }
        else InternalServerError(Json.toJson(ResponseMessage(Constants.FAIL, Constants.SERVER_ERROR_MESSAGE)))

      case _ => BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))
    }
  }
}