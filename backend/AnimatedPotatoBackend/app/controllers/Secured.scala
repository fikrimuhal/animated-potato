package controllers

import scala.concurrent.Future
import play.api.libs.concurrent.Execution.Implicits._
import play.api.mvc._
import play.api.mvc.Results._
import utils.Formatter._
import pdi.jwt._
import models.{ClaimData, Participant, ResponseMessage, Users}
import play.api.libs.json.Json
import utils.Constants
import scala.concurrent.duration._

class AuthenticatedRequest[A](val user: ClaimData, request: Request[A]) extends WrappedRequest[A](request)


trait Secured {
  def UserAction = AuthenticatedAction
  def Admin = AdminAction
}

object AuthenticatedAction extends ActionBuilder[AuthenticatedRequest] {


  def invokeBlock[A](request: Request[A], block: AuthenticatedRequest[A] => Future[Result]) =
    request.jwtSession.getAs[ClaimData](Constants.CLAIM_DATA_KEY) match {

      case Some(claimData) =>

        if (System.currentTimeMillis - claimData.timeZone > JwtSession.MAX_AGE.getOrElse(Constants.SESSION_MAX_AGE.toMillis)) {
          Future.successful(Ok(Json.toJson(ResponseMessage(Constants.SESSION_TIME_OUT, Constants.SESSION_TIME_OUT_MESSAGE))))
        }

        else {
          block(new AuthenticatedRequest(claimData, request)).map(_.refreshJwtSession(request))
        }

      case _ =>
        Future.successful(Unauthorized(Json.toJson(ResponseMessage(Constants.UNAUTHORIZED, Constants.UNAUTHORIZED_ACCESS))))
    }
}

object AdminAction extends ActionBuilder[AuthenticatedRequest] {
  def invokeBlock[A](request: Request[A], block: AuthenticatedRequest[A] => Future[Result]) =
    request.jwtSession.getAs[ClaimData](Constants.CLAIM_DATA_KEY) match {

      case Some(claimData) if Users.isAdmin(claimData.userName) =>
        if (System.currentTimeMillis - claimData.timeZone > JwtSession.MAX_AGE.getOrElse(Constants.SESSION_MAX_AGE.toMillis)) {
          Future.successful(Ok(Json.toJson(ResponseMessage(Constants.SESSION_TIME_OUT, Constants.SESSION_TIME_OUT_MESSAGE))))
        }
        else {
          block (new AuthenticatedRequest(claimData, request)).map(_.refreshJwtSession(request))
        }

      case Some(_) => Future.successful(Forbidden(Json.toJson(ResponseMessage(Constants.FORBIDDEN, Constants.FORBIDDEN_MESSAGE))).refreshJwtSession(request))

      case _ => Future.successful(Unauthorized(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNAUTHORIZED_ACCESS))))
    }
}

