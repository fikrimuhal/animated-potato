package controllers

import scala.concurrent.Future
import play.api.libs.concurrent.Execution.Implicits._
import play.api.mvc._
import play.api.mvc.Results._
import utils.Formatter._
import pdi.jwt._
import models.{ClaimData, Participant, Users}

class AuthenticatedRequest[A](val user: ClaimData, request: Request[A]) extends WrappedRequest[A](request)

trait Secured {
  def UserAction = AuthenticatedAction
  def Admin = AdminAction
}

object AuthenticatedAction extends ActionBuilder[AuthenticatedRequest] {
  def invokeBlock[A](request: Request[A], block: AuthenticatedRequest[A] => Future[Result]) =
    request.jwtSession.getAs[ClaimData]("user") match {
      case Some(user) => block(new AuthenticatedRequest(user, request)).map(_.refreshJwtSession(request))
      case _ => Future.successful(Unauthorized("Unauthorized Access"))
    }
}

object AdminAction extends ActionBuilder[AuthenticatedRequest] {
  def invokeBlock[A](request: Request[A], block: AuthenticatedRequest[A] => Future[Result]) =
    request.jwtSession.getAs[ClaimData]("user") match {
      case Some(user) if Users.isAdmin(user.userName) => block(new AuthenticatedRequest(user, request)).map(_.refreshJwtSession(request))
      case Some(_) => Future.successful(Forbidden("Forbidden Zone").refreshJwtSession(request))
      case _ => Future.successful(Unauthorized("Unauthorized Access"))
    }
}

