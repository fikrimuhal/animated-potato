package services

import InterviewService.{InterviewActor, InterviewManager}
import akka.actor.{Actor, ActorRef}
import animatedPotato.protocol.protocol.UserIdType

import scala.reflect.internal.FatalError

/**
  * Created by who on 10.08.2016.
  */
class RootActor extends Actor {

  println("Root actor başladı..")
  var database: ActorRef = _
  var interviewManager: ActorRef = _

  override def receive: Receive = {

    case ("interview", x) =>
      interviewManager.forward(x)

  }

  override def preStart = {

    println("Root Actor preStart")
    val database: ActorRef = context.actorOf(Database.props, "database")
    interviewManager = context.actorOf(InterviewManager.props(database), "interviewmanager")
    context.actorOf(MockInterviewClient.props, "mockclient")

  }
}
