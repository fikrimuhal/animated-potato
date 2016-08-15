package controllers

import javax.inject.{Inject, Named}

import akka.pattern._
import akka.actor.{ActorRef, ActorSelection}
import akka.util.Timeout
import animatedPotato.protocol.protocol.TestStart
import models._
import play.api.mvc.{Action, Controller, Result}
import play.libs.Json

import scala.concurrent.duration._
import scala.concurrent.Future

/**
  * Created by who on 10.08.2016.
  */

class InterviewController @Inject()(@Named("root") rootActor: ActorRef) extends Controller {

  import scala.concurrent.ExecutionContext.Implicits.global

  implicit val defaultTimeOut = Timeout(2 seconds)

//  def startTest() = Action.async(parse.json){
//    //TODO : kullanıcı testi çözmüş mü kontrol et, çözmemişse interview'e kayıt atıp id dön
//
//
//
//
//  }

//  def answer() = ??? // Action.async(parse.json) {
  //    _.body.
  //      validate[Answer].asOpt.
  //      map {
  //        case answer: Answer => (root ? answer).map {
  //          case true => (root ? ("interview",GetNextQuestion(YesNoAnswer(answer.questionId, value = true)))).mapTo[NextQuestion]
  //              .map(x => Ok(Json.toJson(Questions.getQuestionById(x.id))))
  //          case _ => Ok("Failure: Answer could not saved ")
  //
  //        }.recover { case _ => Ok("Failure: Answer could not saved!") }
  //        case _ => Ok("Failure")
  //      }.
  //      getOrElse(Ok("Failure: Request can not converted to Question"))

  //    Ok("1")
  //  }



}
