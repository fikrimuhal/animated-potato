package InterviewService

import akka.actor.{Actor, Props}
import akka.actor.Actor.Receive
import animatedPotato.protocol.protocol._

/**
  * verilen kullanıcı ve  verilen test oturumu için sonraki soruyu döner
  */
class RandomInterview extends Actor {

  override def receive: Receive = {


    case GetNextQuestion(answer :YesNoAnswer) => sender ! NextQuestion(0)
//    case TestReportRequest(id) => sender ! TestReport(id.left,id.right,scores =(1->33) )

  }

}

object RandomInterview {
  def props = Props[RandomInterview]
}
