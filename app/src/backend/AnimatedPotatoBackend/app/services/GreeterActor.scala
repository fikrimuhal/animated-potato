package services

import akka.actor.Actor
import akka.actor.Actor.Receive

/**
  * Created by who on 08.08.2016.
  */
class GreeterActor extends  Actor{
  var counter = 0
  override def receive: Receive ={
    case "Merhaba" =>
      counter+=1;
      sender ! s"hello,$counter"
      self ! "bana selam dediler"
    case x : String => sender ! "anlamadım"
    case x  => println(s"garip bi şey, $x")

  }
}
