package services

import akka.actor.{Actor, ActorRef}
import akka.actor.Actor.Receive

/**
  * Created by who on 10.08.2016.
  */
class RootActor extends Actor{
  println("Root actor başladı")
  val interview: ActorRef = context.actorOf(InterviewActor.props,"interview")
  val greeter = context.actorOf(GreeterActor.props,"greeter")
  override def receive: Receive = {
    case ("interview", y: Int) => interview.forward(y)
    case _ =>

  }
  override def preStart = {
    println("Root Actor preStart")

  }
}
