package controllers

import models._
import play.api.mvc.{Action, Controller}
import org.mindrot.jbcrypt.BCrypt
import utils.Formatter._
import play.api.libs.json._
import pdi.jwt._
import utils.Constants
case class SignSuccessMessage(status: String, userInfo: Participant, isAdmin: Boolean)

case class LoginForm(username: String, password: String)

case class SignFailMessage(status: String, faultCode: String, message: String)

class LoginSignUpController extends Controller {

  implicit val SignUpFailFormat = Json.format[SignFailMessage]
  implicit val SignUpSuccessFormat = Json.format[SignSuccessMessage]
  implicit val loginFormFormat = Json.format[LoginForm]

  def login() = Action { implicit request =>

    request.body.asJson.flatMap(_.validate[LoginForm].asOpt) match {

      case Some(loginForm) if Users.isValid(loginForm.username, loginForm.password) =>
        Ok(Json.toJson(SignSuccessMessage(Constants.OK
          , Participants.getParticipant(loginForm.username).get
          , Users.get(loginForm.username).get.isadmin.get))
        ).addingToJwtSession("user", Participants.getClaimData(loginForm.username))

      case Some(loginForm) =>
        Ok(Json.toJson(SignFailMessage(Constants.FAIL, "-1", "kullanıcı adı veya şifre hatalı")))

      case None =>
        BadRequest("-1")
    }

  }

  def signUp() = Action { implicit request =>
    try {
      val form: SignUp = request.body.asJson.get.as[SignUp]
      val user: User = User(form.id, form.username, BCrypt.hashpw(form.password, BCrypt.gensalt()), Some(form.email))
      val participant: Participant = Participant(form.id, form.username, form.name, form.lastname, form.email, form.phone, form.photo, form.website, form.notes)

      SignUp.checkUser(form.username, form.email) match {

        case ValidUserInfo =>
          Users.insert(user)
          Participants.insert(participant)
          Ok(Json.toJson(
            SignSuccessMessage("ok",
              Participants.getParticipant(user.username).get,
              Users.get(user.username).get.isadmin.get))
          )
            .addingToJwtSession("user", Participants.getClaimData(user.username))

        case UserNameExists =>
          Ok(Json.toJson(SignFailMessage("fail", "-2", "username kullanımda")))

        case EmailExists =>
          Ok(Json.toJson(SignFailMessage("fail", "-1", "email adresi kullanımda")))

      }
    }
    catch {
      case e: Exception =>
        println(s"hata : ${e.getStackTrace.toString}")
        BadRequest(s"-1, + $e")
    }
  }
}