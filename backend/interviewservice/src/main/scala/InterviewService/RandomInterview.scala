package InterviewService

import akka.actor.{Actor, Props}
import akka.actor.Actor.Receive

/**
  * Created by who on 08.08.2016.
  */
class RandomInterview extends Actor {
  var counter = 0

  override def receive: Receive = {
    case _ => ???
  }
}

object RandomInterview {
  def props = Props[RandomInterview]
}
