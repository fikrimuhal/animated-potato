package InterviewService

import akka.actor.{Actor, ActorRef, Props, Stash, SupervisorStrategy}
import animatedPotato.protocol.protocol.{UserQuestionAnswerTuple, _}
import akka.pattern.ask
import scala.concurrent.Future

case class NonEx(message: String) extends Throwable

/**
  * İlk n veya tüm soruları getiren implementasyon
  *
  *
  */

class InterviewActor(initMessage: InitMessage, client: ActorRef) extends Actor with Stash {
  println("InterviewActor : Constructor")
  var allQuestionIds: List[IdType] = initMessage.questionCategoryWeightTuple.value.map(_.questionId).distinct

  override def receive: Receive = ready

  def ready: Receive = {

    case x: GetNextQuestion =>
      println("interviewActor'e GetNextQuestion geldi ")
      client ! getNextQuestionId().map(NextQuestion(_)).getOrElse {
        println("interviewActor TestFinish yollayacak")
        client ! TestFinish(initMessage.interviewId, initMessage.userId)
        unstashAll()
        context become testFinished
      }
      println("interviewActor getNextQuestion'a cevap verdi")

    case x => stash

  }

  def testFinished: Receive = {

    case x: TestReport =>
      println(s"Interview Actore TestReport geldi : $x")
      client ! x

    case x => sender ! new IllegalStateException(s"unsopperted operation: $x")

  }

  override def preStart() = {
    println("InterviewActor: preStart")

  }

  def getNextQuestionId() = {
    val maybeQuestionId = allQuestionIds.headOption
    if (maybeQuestionId.isDefined) allQuestionIds = allQuestionIds.tail
    maybeQuestionId

  }
}

object InterviewActor {

  def props(initMessage: InitMessage, client: ActorRef) = Props(classOf[InterviewActor], initMessage, client)

}