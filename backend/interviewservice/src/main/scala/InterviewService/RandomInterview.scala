package InterviewService

import akka.actor.{Actor, ActorRef, Props, Stash, SupervisorStrategy}
import animatedPotato.protocol.protocol._
import akka.pattern.ask
import scala.concurrent.Future

/**
  * İlk n veya tüm soruları getiren implementasyon
  *
  *
  */

class RandomInterview(initMessage: InitMessage) extends Actor with Stash {
  println("RandomInterview : Constructor")
  var shuffledQuestionIds: List[IdType] = scala.util.Random.shuffle(initMessage.questionCategoryWeightTuple.value.map(_.questionId).distinct)

  override def receive: Receive = ready

  def ready: Receive = {

    case x: GetNextQuestion =>
      println("RandomInterview'e GetNextQuestion geldi ")
      sender ! getNextQuestionId.map(NextQuestion).getOrElse {
        println("RandomInterview TestFinish yollayacak")
        sender ! TestFinish(initMessage.interviewId, initMessage.userId)
        unstashAll()
        context become testFinished
      }
      println("RandomInterview getNextQuestion'a cevap verdi")

    case x =>
      println(s"random interview ready'de stashe atıyor : $x")
      stash

  }

  def testFinished: Receive = {

    case x: TestReportRequest =>
      context.parent ! x

    case x: TestReport =>
      println(s"RandomInterview TestReport geldi : $x")
    // sender ! x

    case x =>
      println(s"RandomInterview TestFinished garip bir mesaj: $x")
      sender ! new IllegalStateException(s"unsopperted operation: $x")

  }

  override def preStart = {

    println("RandomInterview: preStart")

  }

  def getNextQuestionId = {
    val maybeQuestionId = shuffledQuestionIds.headOption
    if (maybeQuestionId.isDefined) shuffledQuestionIds = shuffledQuestionIds.tail
    maybeQuestionId

  }
}

object RandomInterview {

  def props(initMessage: InitMessage) = Props(classOf[RandomInterview], initMessage)

}