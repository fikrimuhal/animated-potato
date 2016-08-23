package controllers

import authentikat.jwt.{JsonWebToken, JwtClaimsSet, JwtHeader}
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

case class SignUpSuccess(status : String,token: String, userName: String, isAdmin : Boolean)
case class SignUpFail(failCode: Int,text: String, status : String)

class LoginSignUpController extends Controller{

  implicit  val f = Json.format[SignUpFail]
  implicit  val f2 = Json.format[SignUpSuccess]

  def signUp() = Action { implicit request =>
    try {
      val form: SignUp = request.body.asJson.get.as[SignUp]
      val user: User = User(form.id,form.username,form.password.bcrypt)
//      val jwt: String =   JsonWebToken(JwtHeader("HS256"), JwtClaimsSet(Json.stringify(Json.toJson(user))), "secretkeyimiz")
      val participant: Participant = Participant(form.id, form.username, form.name, form.lastname, form.email, form.phone, form.photo, form.website, form.notes)

      if (!Participants.insert(participant)){
        Ok(Json.toJson(SignUpFail(-1,"email var", "fail")))
      }
      else if (!Users.insert(user)){
        Ok(Json.toJson(SignUpFail(-2,"userName var", "fail")))
      }
      else Ok("1").addingToJwtSession("user",user)
    }
    catch {
      case e: Exception =>
        println(s"hata : ${e.getStackTrace.toString}")
        BadRequest(s"-1, + $e")
    }
  }


  def addAdmin() = Action { implicit request =>
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
      println(s"111111111111111 ${request.headers.get("Autherization")}")
      val user: User = request.body.asJson.get.as[User]
       Ok.addingToJwtSession("user", user)

    }
    catch {
      case e: Exception =>
        println(s"hata: $e")
        BadRequest("-1")
    }
  }
}




