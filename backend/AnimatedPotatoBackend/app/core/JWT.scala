package core

import dao.UserDAO
import models.ClaimData
import pdi.jwt._
import play.api.libs.concurrent.Execution.Implicits._
import play.api.libs.json._
import play.api.mvc.Results._
import play.api.mvc._
import utils.Formatter._
import utils.{Constants, ResponseMessage}

import scala.concurrent.Future

class AuthenticatedRequest[A](val user: ClaimData, request: Request[A]) extends WrappedRequest[A](request)


trait Jwt {
  def UserAction = AuthenticatedAction

  def Admin = AdminAction
}

object AuthenticatedAction extends ActionBuilder[AuthenticatedRequest] {


  def invokeBlock[A](request: Request[A], block: AuthenticatedRequest[A] => Future[Result]) =
    request.jwtSession.getAs[ClaimData](Constants.CLAIM_DATA_KEY) match {

      case Some(claimData) =>
        block(new AuthenticatedRequest(claimData, request)).map(_.refreshJwtSession(request))

      case _ =>
        val tokenOption = request.headers.get("Authorization")
        if (tokenOption.isDefined && Jwt.decode(tokenOption.get, JwtOptions(expiration = true, signature = false)).toString.contains("JwtExpirationException"))
          Future.successful(Ok(Json.toJson(ResponseMessage(Constants.SESSION_TIME_OUT, Constants.SESSION_TIME_OUT_MESSAGE))))
        else
          Future.successful(Unauthorized(Json.toJson(ResponseMessage(Constants.UNAUTHORIZED, Constants.UNAUTHORIZED_ACCESS))))
    }

}

object AdminAction extends ActionBuilder[AuthenticatedRequest] {
  def invokeBlock[A](request: Request[A], block: AuthenticatedRequest[A] => Future[Result]) =
    request.jwtSession.getAs[ClaimData](Constants.CLAIM_DATA_KEY) match {

      case Some(claimData) if (new UserDAO).isAdmin(claimData.email) =>
          block(new AuthenticatedRequest(claimData, request)).map(_.refreshJwtSession(request))

      case Some(_) => Future.successful(Forbidden(Json.toJson(ResponseMessage(Constants.FORBIDDEN, Constants.FORBIDDEN_MESSAGE))).refreshJwtSession(request))

      case _ =>
        val tokenOption = request.headers.get("Authorization")

        if (tokenOption.isDefined && Jwt.decode(tokenOption.get, JwtOptions(expiration = true, signature = false)).toString.contains("JwtExpirationException"))
          Future.successful(Ok(Json.toJson(ResponseMessage(Constants.SESSION_TIME_OUT, Constants.SESSION_TIME_OUT_MESSAGE))))
        else
          Future.successful(Unauthorized(Json.toJson(ResponseMessage(Constants.UNAUTHORIZED, Constants.UNAUTHORIZED_ACCESS))))
    }
}

