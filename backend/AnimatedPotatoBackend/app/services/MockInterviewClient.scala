package services

import akka.actor.{Actor, ActorRef, Props}
import akka.actor.Actor.Receive
import animatedPotato.protocol.protocol._
import models.Answers
import play.libs.Scala
import akka.pattern.ask

/**
  * Created by who on 15.08.2016.
  */
class MockInterviewClient extends Actor {


  override def receive: Receive = {

    case NextQuestion(questionId) =>
      sender ! GetNextQuestion(answer = Some(YesNoAnswer(questionId, scala.util.Random.nextBoolean())))
      println(s"Client'a next question geldi $questionId")

    case TestReport(interviewId, userId, scores) =>
      println(s"Client'a rapor geldi :interviewID : $interviewId, userId : $userId, scores : $scores")

    case m: TestFinish =>
      println(s"Client'a test finish geldi : $m")
      sender ! TestReportRequest(Left(1))

    case x =>
      println(s"Client: Unexpected message : $x")

  }

  override def preStart = {

    println("Client Started!")
    context.parent ! ("interview", TestStart(1, 1))
    context.parent ! ("interview", GetNextQuestion())

  }
}

object MockInterviewClient {

  def props = Props(classOf[MockInterviewClient])
}