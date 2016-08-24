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


case class SignUpSuccess(status: String, userInfo: Participant, isAdmin: Boolean)

case class LoginForm(username: String, password: String)

case class SignUpFail(status: String, faultCode: String, message: String)

class LoginSignUpController extends Controller {

  implicit val f = Json.format[SignUpFail]
  implicit val f2 = Json.format[SignUpSuccess]
  implicit val loginFormFormat = Json.format[LoginForm]

  def signUp() = Action { implicit request =>
    try {
      val form: SignUp = request.body.asJson.get.as[SignUp]
      val user: User = User(form.id, form.username, form.password.bcrypt, Some(form.email))
      val participant: Participant = Participant(form.id, form.username, form.name, form.lastname, form.email, form.phone, form.photo, form.website, form.notes)


      SignUp.checkUser(form.username, form.email) match {

        case ValidUserInfo =>
          Users.insert(user)
          Participants.insert(participant)
          Ok(Json.toJson(
          SignUpSuccess("ok",
            Participants.getParticipant(user.username).get,
            Users.get(user.username).get.isadmin.get))
        )
          .addingToJwtSession("user", user)

        case UserNameExists =>
          Ok(Json.toJson(SignUpFail("fail", "-2", "username kullanımda")))

        case EmailExists =>
          Ok(Json.toJson(SignUpFail("fail", "-1", "email adresi kullanımda")))

      }

    }
    catch {
      case e: Exception =>
        println(s"hata : ${e.getStackTrace.toString}")
        BadRequest(s"-1, + $e")
    }
  }


  def addAdmin() = Action { implicit request =>
    val user: User = request.body.asJson.get.as[User]
    Users.insert(user.copy(isadmin = Some(true)))
    Ok("1")

  }

  def login() = Action { implicit request =>
    try {
      val loginForm: LoginForm = request.body.asJson.get.as[LoginForm]

      Users.isValid(loginForm.username, loginForm.password) match {
        case true =>
          Ok(Json.toJson(SignUpSuccess("ok"
            , Participants.getParticipant(loginForm.username).get
            , Users.get(loginForm.username).get.isadmin.get))
          ).addingToJwtSession("user", loginForm)

        case false =>
          Ok(Json.toJson(SignUpFail("fail", "-1", "kullanıcı adı veya şifre hatalı")))
      }

    }
    catch {
      case e: Exception =>
        BadRequest("-1")
    }
  }
}




