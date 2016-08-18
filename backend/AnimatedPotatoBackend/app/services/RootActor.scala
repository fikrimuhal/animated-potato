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
  val database: ActorRef = context.actorOf(Database.props, "database")
  val interviewManager: ActorRef = context.actorOf(InterviewManager.props(database), "interviewmanager")
  val mockInterviewClient = context.actorOf(MockInterviewClient.props(interviewManager),"mockclient")

  //  val randominterview: ActorRef = context.actorOf(InterviewActor.props(database),"randominterview")
  //  val greeter: ActorRef = context.actorOf(GreeterActor.props,"greeter")
  //  context.actorOf(MockInterviewClient.props(randominterview))

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

  }
}
