package controllers

import models._
import play.api.mvc.{Action, Controller}
import com.github.t3hnar.bcrypt._
import utils.Formatter._
import play.api._
import play.api.mvc._
import play.api.libs.json._
import play.api.libs.functional.syntax._

import pdi.jwt._

/**
  * Created by who on 09.08.2016.
  */
class LoginSignUpController extends Controller with Secured {

  def signUp() = Action { implicit request =>
    try {
      val form: SignUp = request.body.asJson.get.as[SignUp]
      val user: User = User(form.username, form.password.bcrypt)
      val participant: Participant = Participant(form.id, form.username, form.name, form.lastname, form.email, form.phone, form.photo, form.website, form.notes)
      if (!Participants.insert(participant)) BadRequest("email vaar")
      if (!Users.insert(user)) BadRequest("username var ")
      else Ok(Json.toJson(user)).addingToJwtSession("user",user)
    }
    catch {
      case e: Exception =>
        println(s"hata : ${e.getStackTrace.toString}")
        BadRequest(s"-1, + $e")
    }
  }


  def addAdmin() = Admin { implicit request =>
    try {
      val user: User = request.body.asJson.get.as[User]
      if (Users.insert(user.copy(isadmin = Some(true)))) Ok.addingToJwtSession("user",user)
      else BadRequest("-1")
    }
    catch {
      case e: Exception => BadRequest("-1")
    }
  }

  def login() = Action { implicit request =>
    try {
      val user: User = request.body.asJson.get.as[User]
      if (Users.isValid(user)) Ok.addingToJwtSession("user", user)
      else Unauthorized
    }
    catch {
      case e: Exception => BadRequest("-1")
    }

  }
}
