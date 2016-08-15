package services

import InterviewService.InterviewActor
import akka.actor.{Actor, ActorRef}


import scala.reflect.internal.FatalError

/**
  * Created by who on 10.08.2016.
  */
class RootActor extends Actor{
  println("Root actor başladı..")

  val interview: ActorRef = context.actorOf(InterviewActor.props,"interview")
  val greeter: ActorRef = context.actorOf(GreeterActor.props,"greeter")
  context.actorOf(MockInterviewClient.props(interview))

  override def receive: Receive = {
    case ("interview",x) => interview.forward(x)

  }
  override def preStart = {
    println("Root Actor preStart")

  }
}
