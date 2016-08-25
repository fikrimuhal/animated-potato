package controllers

import models.{Users, User}
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import utils.Formatter._
/**
  * Created by who on 23.08.2016.
  */
class UserController extends Controller{


  def insertUser() = Action { implicit request =>
    try {
      val user: User = request.body.asJson.get.as[User]
      Users.insert(User(username = user.username,password = user.password,email = user.email))
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


}
