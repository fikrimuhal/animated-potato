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
  var interviewActors = Map[UserIdType, ActorRef]()
  var database: ActorRef = _

  override def receive: Receive = {
    //    case ("interview",x) =>
    //      interview.forward(x)

    case ("interview", clientId: UserIdType, x) =>
      val interviewActor = interviewActors.getOrElse(clientId, {
        val ia = context.actorOf(InterviewManager.props(database))
        interviewActors = interviewActors + (clientId -> ia)
        ia
      })
      interviewActor.forward(x)

  }

  override def preStart = {
    println("Root Actor preStart")
    val database: ActorRef = context.actorOf(Database.props, "database")
    val interviewManager: ActorRef = context.actorOf(InterviewManager.props(database), "interviewmanager")
    context.actorOf(MockInterviewClient.props(interviewManager),"mockclient")

  }
}
