package InterviewService

import akka.actor.{Actor, PoisonPill, Props, Stash}
import animatedPotato.protocol.protocol._

/**
  * İlk n veya tüm soruları rastgele getiren implementasyon
  *
  */


class InterviewActor(initMessage: InitMessage) extends Actor with Stash {
  println("InterviewActor : Constructor")
  val NUMBER_OF_QUESTIONS = 20

  var shuffledQuestionIds: List[IdType] = initMessage.questionCategoryWeightTuple.value.map(_.questionId).distinct.take(NUMBER_OF_QUESTIONS)

  override def receive: Receive = ready

  def ready: Receive = {

    case x: GetNextQuestion =>
      println("InterviewActor'e GetNextQuestion geldi ")
      sender ! getNextQuestionId.map(NextQuestion(_, initMessage.interviewId)).getOrElse {
        println("InterviewActor TestFinish yollayacak")
        sender ! TestFinish(x.interviewId, initMessage.userIdentifier)

        unstashAll()
        context become testFinished
      }
      println("InterviewActor getNextQuestion'a cevap verdi")

    case x =>
      println(s"random interview ready'de stashe atıyor : $x")
      stash

  }

  def testFinished: Receive = {

    case x: TestReportRequest =>
      // TODO : scores will be calculated here
      sender ! TestReport(initMessage.interviewId
        ,initMessage.userIdentifier
        ,Map(1.toLong -> 1.5 , 2.toLong -> 2.4))
      context.parent ! IAmDone(x.id)
      self ! PoisonPill

    case x =>
      println(s"InterviewActor TestFinished garip bir mesaj: $x")
      sender ! new IllegalStateException(s"unsopperted operation: $x")

  }

  override def preStart = {
    println("InterviewActor: preStart")

  }

  def getNextQuestionId = {
    val maybeQuestionId = shuffledQuestionIds.headOption
    if (maybeQuestionId.isDefined) shuffledQuestionIds = shuffledQuestionIds.tail
    maybeQuestionId

  }
}

object InterviewActor {

  def props(initMessage: InitMessage) = Props(classOf[InterviewActor], initMessage)

}