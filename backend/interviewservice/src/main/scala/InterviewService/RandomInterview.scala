package InterviewService

import akka.actor.{Actor, Props, Stash}
import animatedPotato.protocol.protocol._

import scala.collection.mutable.ListBuffer

/**
  * İlk n veya tüm soruları rastgele getiren implementasyon
  *
  */

class RandomInterview(initMessage: InitMessage) extends Actor with Stash {

  println("RandomInterview : Constructor")
  final val MAX_NUMBER_OF_QUESTIONS = 20
  var shuffledQuestionIds: List[IdType] = scala.util.Random.shuffle(initMessage.questionCategoryWeightTuple.value.map(_.questionId).distinct.take(MAX_NUMBER_OF_QUESTIONS))
  var answerList = new ListBuffer[YesNoAnswer]()

  override def receive: Receive = ready

  def ready: Receive = {

    case x: GetNextQuestion =>
      if (x.answer.isDefined) answerList += x.answer.get
      println("RandomInterview'e GetNextQuestion geldi ")
      sender ! getNextQuestionId.map(NextQuestion(_, initMessage.interviewId, shuffledQuestionIds.length)).getOrElse {
        println("RandomInterview TestFinish yollayacak")
        sender ! TestFinish(x.interviewId, initMessage.userIdentifier)

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
      implicit def bool2int(b: Boolean) = if (b) 1 else 0
      val answers: List[YesNoAnswer] = answerList.toList
      val categoryList = initMessage.questionCategoryWeightTuple.value.map(_.categoryId).distinct
      val qcwt = initMessage.questionCategoryWeightTuple.value
      val scoresList = categoryList.map(cat => (cat, qcwt.filter(_.categoryId == cat).map(q => q.weight * answers.filter(_.questionId == q.questionId).head.value).sum))
      val scores = Map(scoresList map { x => (x._1, x._2) }: _*)
      println("randoma testreportrequest geldi")
      sender ! TestReport(initMessage.interviewId, initMessage.userIdentifier, scores)

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