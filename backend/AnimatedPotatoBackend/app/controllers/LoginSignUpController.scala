package controllers

import dao.UserDAO
import models._
import play.api.mvc.{Action, Controller}
import utils.Formatter._
import play.api.libs.json._
import pdi.jwt._
import utils.{Constants, ResponseMessage}


case class SignSuccessMessage(status: String, userInfo: Participant, isAdmin: Boolean)

case class LoginForm(username: String, password: String)

case class SignFailMessage(status: String, faultCode: String, message: String)

class LoginSignUpController extends Controller {

  implicit val SignUpFailFormat = Json.format[SignFailMessage]
  implicit val SignUpSuccessFormat = Json.format[SignSuccessMessage]
  implicit val loginFormFormat = Json.format[LoginForm]
  final val SIGN_UP_FAIL_CODE = "-1"
  final val USERNAME_EXISTS_CODE = "-1"
  final val EMAIL_EXISTS_CODE = "-2"

  final val UserDAO = new UserDAO

  def login = Action { implicit request =>

    request.body.asJson.flatMap(_.validate[LoginForm].asOpt) match {

      case Some(loginForm) if (new UserDAO).isValid(loginForm.username, loginForm.password) =>
        Ok(Json.toJson(SignSuccessMessage(Constants.OK
          , ParticipantDAO.get(loginForm.username).get
          , (new UserDAO).get(loginForm.username).get.isadmin.get))
        ).addingToJwtSession(Constants.CLAIM_DATA_KEY, ParticipantDAO.getClaimData(loginForm.username))

      case Some(loginForm) =>
        Ok(Json.toJson(SignFailMessage(Constants.FAIL, SIGN_UP_FAIL_CODE, Constants.WRONG_PASSWORD)))

      case _ =>
        BadRequest(Json.toJson(ResponseMessage(Constants.FAIL,Constants.UNEXPECTED_ERROR_MESSAGE)))
    }

  }

  def signUp = Action { implicit request =>
    try {
      val form: SignUp = request.body.asJson.get.as[SignUp]
      val user: User = User(form.id, form.username,form.password, form.email)
      val participant: Participant = Participant(form.id, form.username, form.name, form.lastname, form.email, form.phone, form.photo, form.website, form.notes)

      SignUp.checkUser(form.username, form.email) match {

        case ValidUserInfo =>
          UserDAO.insert(user)
          ParticipantDAO.insert(participant)
          Ok(Json.toJson(
            SignSuccessMessage(Constants.OK,
              ParticipantDAO.get(user.username).get,
              UserDAO.get(user.username).get.isadmin.get))
          )
            .addingToJwtSession(Constants.CLAIM_DATA_KEY, ParticipantDAO.getClaimData(user.username))

        case UserNameExists =>
          Ok(Json.toJson(SignFailMessage(Constants.FAIL, USERNAME_EXISTS_CODE,Constants.USERNAME_EXISTS)))

        case EmailExists =>
          Ok(Json.toJson(SignFailMessage(Constants.FAIL,EMAIL_EXISTS_CODE,Constants.EMAIL_EXISTS)))

      }
    }
    catch {
      case e: Exception =>
        BadRequest(Json.toJson(ResponseMessage(Constants.FAIL,Constants.UNEXPECTED_ERROR_MESSAGE)))
    }
  }
}