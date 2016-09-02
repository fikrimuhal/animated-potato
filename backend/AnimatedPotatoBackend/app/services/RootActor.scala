package services

import akka.pattern._
import InterviewService.{InterviewActor, InterviewManager}
import akka.actor.{Actor, ActorRef}
import akka.util.Timeout
import animatedPotato.protocol.protocol.{NextQuestion, UserIdType}
import controllers.{Interview, TestRequest}

import scala.concurrent.Future
import scala.concurrent.duration._
import scala.reflect.internal.FatalError

/**
  * Created by who on 10.08.2016.
  */
class RootActor extends Actor {

  println("Root actor başladı..")
  var interviewManager: ActorRef = _
  implicit val timeout = Timeout(5 seconds)

  import scala.concurrent.ExecutionContext.Implicits.global

  override def receive: Receive = {

    case (Interview, x) =>
      println(s"root actore gelen $x")
      val _sender = sender()
      (interviewManager ? x).map(_sender ! _)

    case x =>
      println(s"root hepsini alan $x")

  }

  override def preStart = {

    println("Root Actor preStart")
    val database: ActorRef = context.actorOf(Database.props, "database")
    interviewManager = context.actorOf(InterviewManager.props(database), "interviewmanager")
    //    context.actorOf(MockInterviewClient.props, "mockclient")

  }
}
