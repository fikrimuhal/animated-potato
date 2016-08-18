package InterviewService

import akka.actor.{Actor, ActorRef, Props, Stash}
import akka.actor.Actor.Receive
import animatedPotato.protocol.protocol._
import akka.pattern.ask
import akka.util.Timeout

import scala.concurrent.Await
import scala.concurrent.duration._
import scala.concurrent.ExecutionContext.Implicits.global

case class InitMessage(interviewId: InterviewId, userId: UserIdType, restrictedCategoryList: Option[List[CategoryId]],
                       questionCategoryWeightTuple: QuestionCategoryWeightTupleList,
                       categoryList: CategoryList,
                       userQuestionAnswerTuple: AllAnswerEvents)

class InterviewManager(database: ActorRef) extends Actor with Stash {

  println("Interview Manager: Constructor")
  implicit val timeout = Timeout(5 seconds)


  override def receive: Receive = init

  def init: Receive = {

    case (x: String, TestStart(interviewId, userId, restrictedCategoryList)) =>
      println("Interview Manager: TestStart")

      val qcwtFuture = (database ? RequestAllQuestionCategoryWeight).mapTo[QuestionCategoryWeightTupleList]
      val categoryListFuture = (database ? RequestAllCategories).mapTo[CategoryList]
      val userQuestionAnswerTupleFuture = (database ? RequestAllAnswerEvents).mapTo[AllAnswerEvents]

      val questionCategoryWeightTupleList = Await.result(qcwtFuture, 5 seconds)
      val categoryList = Await.result(categoryListFuture, 5 seconds)
      val allAnswerEvents = Await.result(userQuestionAnswerTupleFuture, 5 seconds)
      val initMessage = InitMessage(interviewId, userId, restrictedCategoryList, questionCategoryWeightTupleList, categoryList, allAnswerEvents)
      var interview: ActorRef = context.actorOf(InterviewActor.props(initMessage, sender), "interview")

      if (x == "random") {
        interview = context.actorOf(RandomInterview.props(initMessage, sender), "randominterview")
      }

      unstashAll()
      context become ready(interview)

    case x => stash

  }

  def ready(interview: ActorRef): Receive = {
    case TestReportRequest(id) =>
      interview ! TestReport(1, 1, Map(1.toLong -> 1.5))

    case x =>
      println(s"bunu interview halletsin : $x")
      interview forward x
  }

  override def preStart() = {
    println("InterviewManager: preStart")

  }
}

object InterviewManager {

  def props(database: ActorRef) = Props(classOf[InterviewManager], database)

}