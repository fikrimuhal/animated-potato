package controllers

import javax.inject.{Inject, Named}

import akka.pattern._
import akka.actor.{ActorRef, ActorSelection}
import akka.util.Timeout
import play.api.mvc.{Action, Controller, Result}
import scala.concurrent.duration._
import scala.concurrent.Future

/**
  * Created by who on 10.08.2016.
  */

class InterviewController @Inject()(@Named("root") root: ActorRef) extends Controller {

  import scala.concurrent.ExecutionContext.Implicits.global
  implicit val defaultTimeOut = Timeout(2 seconds)

  def answer() = Action.async {
    //TODO cevabı kaydet,
    //TODO next question send client
    (root ? ("interview",1) ).mapTo[Int].map(x => Ok(s"bir sonraki soru : $x")).recover{
      case _ => BadRequest("-1")

    }
  }


}
