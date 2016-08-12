package InterviewService

import akka.actor.{Actor, Props}
import akka.actor.Actor.Receive
import animatedPotato.protocol.protocol._

/**
  * verilen kullanıcı ve  verilen test oturumu için sonraki soruyu döner
  */
class RandomInterview extends Actor {
  var counter = 0

  override def receive: Receive = {
    case GetNextQuestion(answer :YesNoAnswer) =>
      //answer.answer
      sender ! NextQuestion(0)
  }
}

object RandomInterview {
  def props = Props[RandomInterview]
}
