package InterviewService

import akka.actor.{Actor, ActorRef, PoisonPill, Props, Stash, SupervisorStrategy}
import animatedPotato.protocol.protocol._
import akka.pattern.ask

import scala.concurrent.Future

case class IAmDone(actorId: InterviewId)

/**
  * İlk n veya tüm soruları rastgele getiren implementasyon
  *
  */


class RandomInterview(initMessage: InitMessage) extends Actor with Stash {
  println("RandomInterview : Constructor")
  final val MAX_NUMBER_OF_QUESTIONS = 20

  var shuffledQuestionIds: List[IdType] = scala.util.Random.shuffle(initMessage.questionCategoryWeightTuple.value.map(_.questionId).distinct.take(MAX_NUMBER_OF_QUESTIONS))

  override def receive: Receive = ready

  def ready: Receive = {

    case x: GetNextQuestion =>
      println("RandomInterview'e GetNextQuestion geldi ")
      sender ! getNextQuestionId.map(NextQuestion(_, initMessage.interviewId,shuffledQuestionIds.length)).getOrElse {
        println("RandomInterview TestFinish yollayacak")
        sender! TestFinish(x.interviewId, initMessage.userIdentifier)

        unstashAll()
        context become testFinished
      }
      println("RandomInterview getNextQuestion'a cevap verdi")

    case x =>
      println(s"random interview ready'de stashe atıyor : $x")
      stash

  }

  def testFinished: Receive = {

    case TestReportRequest(id) =>
      // TODO : scores will be calculated here
      println("randoma testreportrequest geldi")
      sender ! TestReport(initMessage.interviewId
        ,initMessage.userIdentifier
        ,Map(1.toLong -> 1.5 , 2.toLong -> 2.4))

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