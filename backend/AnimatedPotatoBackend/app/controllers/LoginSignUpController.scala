package controllers

import animatedPotato.protocol.protocol._
import dao.UserDAO
import models._
import play.api.mvc.{Action, Controller}
import utils.Formatter._
import play.api.libs.json._
import pdi.jwt._
import utils.{Constants, ResponseMessage}

case class SignSuccessMessage(status: String, userInfo: Participant, isAdmin: Boolean)

case class LoginForm(email: String, password: String)

case class SignFailMessage(status: String, faultCode: String, message: String)

case class SignUpForm(id: Option[IdType],
                      name: String,
                      lastname: String,
                      email: String,
                      phone: String,
                      photo: Option[String] = Some(""),
                      website: Option[String] = Some(""),
                      notes: Option[String] = Some(""),
                      password: String
                     ) {
  require(name.length <= 255
    && email.matches(Constants.emailRegex)
    && lastname.length <= 255
    && email.length <= 255
    && phone.length <= 255
    && website.toString.length <= 255
    && notes.toString.length <= 255)
}

class LoginSignUpController extends Controller {

  final val SIGN_UP_FAIL_CODE = "-1"
  final val EMAIL_EXISTS_CODE = "-2"

  final val UserDAO = new UserDAO

  def login = Action { implicit request =>

    request.body.asJson.flatMap(_.validate[LoginForm].asOpt) match {

      case Some(loginForm) =>

        if ((new UserDAO).isValid(loginForm.email, loginForm.password)) {
          Ok(Json.toJson(SignSuccessMessage(Constants.OK
            , ParticipantDAO.get(loginForm.email).get
            , (new UserDAO).getByEmail(loginForm.email).get.isadmin.get))
          ).addingToJwtSession(Constants.CLAIM_DATA_KEY, ParticipantDAO.getClaimData(loginForm.email))
        }
        else {
          Ok(Json.toJson(SignFailMessage(Constants.FAIL, SIGN_UP_FAIL_CODE, Constants.WRONG_PASSWORD)))
        }

      case _ =>
        BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))
    }

  }

  def signUp = Action { implicit request =>


    request.body.asJson.flatMap(_.validate[SignUpForm].asOpt) match {

      case Some(signUpForm) =>

        if (UserDAO.isEmailProper(signUpForm.email)) {

          val user: User = User(signUpForm.id, signUpForm.password, signUpForm.email)
          val participant: Participant = Participant(signUpForm.id, signUpForm.name, signUpForm.lastname, signUpForm.email, signUpForm.phone, signUpForm.photo, signUpForm.website, signUpForm.notes)

          UserDAO.insert(user)
          ParticipantDAO.insert(participant)

          Ok(Json.toJson(
            SignSuccessMessage(Constants.OK,
              ParticipantDAO.get(user.email).get,
              UserDAO.isAdmin(user.email)))
          )
        }

        else {
          Ok(Json.toJson(SignFailMessage(Constants.FAIL, EMAIL_EXISTS_CODE, Constants.EMAIL_EXISTS)))
        }

      case Some(signUpForm) => BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.BAD_REQUEST)))

    }

  }
}