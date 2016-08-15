package services

import akka.actor.{Actor, ActorRef, Props}
import akka.actor.Actor.Receive
import animatedPotato.protocol.protocol._
import models.Answers
import play.libs.Scala

/**
  * Created by who on 15.08.2016.
  */
class MockInterviewClient(interview : ActorRef) extends Actor  {
  override def receive: Receive = {
    case NextQuestion(questionId) =>
      interview ! GetNextQuestion(answer = Some(YesNoAnswer(questionId,scala.util.Random.nextBoolean())))
      println(s"next question geldi $questionId")

    case TestReport(interviewId,userId,scores) =>
      println(s"interviewID : $interviewId, userId : $userId, scores : $scores")

    case m:TestFinish =>
      println(s"test finish geldi : $m")
      interview ! TestReportRequest(Left(1))

    case x =>
      println(s"Unexpected message : $x")
  }

  override def preStart = {

    println("MockInterview Started!")
    interview ! TestStart(1,1)
    interview ! GetNextQuestion()

  }
}

object MockInterviewClient  {

  def props(interview : ActorRef) = Props(classOf[MockInterviewClient],interview)

}