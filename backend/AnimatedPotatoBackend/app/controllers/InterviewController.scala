package controllers

import javax.inject.{Inject, Named}

import akka.pattern._
import akka.actor.{ActorRef, ActorSelection}
import akka.util.Timeout
import animatedPotato.protocol.protocol.{InterviewId, NextQuestion, QuestionId, TestStart}
import com.google.inject.Singleton
import play.api.libs.json.Json
import models._
import play.api.mvc.{Action, Controller, Result}
import scala.concurrent.duration._
import scala.concurrent.Future
import utils.Constants
import utils.Formatter._

/**
  * Created by who on 10.08.2016.
  */
case class Email(email: String)

case class InterviewStartResponse(valid: Boolean, firstQuestion: Option[Question], remainingQuestion: Option[Int])

case class YesNoAnswer(questionId: QuestionId, value: Boolean)

case class GetNextQuestion(answer: YesNoAnswer, interviewId: InterviewId)

@Singleton
class InterviewController @Inject()(@Named("root") rootActor: ActorRef) extends Controller {
  import play.api.libs.concurrent.Execution.Implicits.defaultContext
  implicit val defaultTimeOut = Timeout(2 seconds)

  def startTestNonRegistered() = Action.async {

    println("interview controllera geldi ve rootActor'e soruyor.")
    val futureResponse = (rootActor ? ("interview", TestStart(1, 1, None))).mapTo[NextQuestion]
    futureResponse.map(response =>  Ok(Json.toJson(Questions.getQuestionById(response.questionId))))

  }

}


