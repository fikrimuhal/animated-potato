package InterviewService

import akka.actor.{Actor, ActorRef, Props, Stash, SupervisorStrategy}
import animatedPotato.protocol.protocol.{UserQuestionAnswerTuple, _}
import akka.pattern.ask
import scala.concurrent.Future

/**
  * İlk n veya tüm soruları getiren implementasyon
  *
  *
  */

class RandomInterview(initMessage: InitMessage, client: ActorRef) extends Actor with Stash {
  println("RandomInterview : Constructor")
  var shuffledQuestionIds: List[IdType] = scala.util.Random.shuffle(initMessage.questionCategoryWeightTuple.value.map(_.questionId).distinct)

  override def receive: Receive = ready

  def ready: Receive = {

    case x: GetNextQuestion =>
      println("RandomInterview'e GetNextQuestion geldi ")
      client ! getNextQuestionId().map(NextQuestion(_)).getOrElse {
        println("RandomInterview TestFinish yollayacak")
        client ! TestFinish(initMessage.interviewId, initMessage.userId)
        unstashAll()
        context become testFinished
      }
      println("RandomInterview getNextQuestion'a cevap verdi")

    case x => stash

  }

  def testFinished: Receive = {

    case x: TestReport =>
      println(s"RandomInterview TestReport geldi : $x")
      client ! x

    case x => sender ! new IllegalStateException(s"unsopperted operation: $x")

  }

  override def preStart() = {
    println("RandomInterview: preStart")

  }

  def getNextQuestionId() = {
    val maybeQuestionId = shuffledQuestionIds.headOption
    if (maybeQuestionId.isDefined) shuffledQuestionIds = shuffledQuestionIds.tail
    maybeQuestionId

  }
}

object RandomInterview {

  def props(initMessage: InitMessage, client: ActorRef) = Props(classOf[RandomInterview], initMessage, client)

}