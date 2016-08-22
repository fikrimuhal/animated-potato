package InterviewService

import akka.actor.{Actor, ActorRef, Props, Stash}
import animatedPotato.protocol.protocol._
import akka.pattern.ask
import akka.util.Timeout
import scala.concurrent.duration._
import scala.concurrent.ExecutionContext.Implicits.global
import akka.util.Timeout._

case class InitMessage(interviewId: InterviewId, userId: UserIdType, restrictedCategoryList: Option[List[CategoryId]],
                       questionCategoryWeightTuple: QuestionCategoryWeightTupleList,
                       categoryList: CategoryList,
                       userQuestionAnswerTuple: AllAnswerEvents)

class InterviewManager(database: ActorRef) extends Actor with Stash {
  implicit val timeout = Timeout(5 seconds)
  println("Interview Manager: Constructor")
  var interviewActors = Map[UserIdType, ActorRef]()

  override def receive: Receive = init

  def init: Receive = {

    case (TestStart(interviewId, userId, restrictedCategoryList)) =>

      println("Interview Manager: TestStart")
      val qcwtFuture = (database ? RequestAllQuestionCategoryWeight).mapTo[QuestionCategoryWeightTupleList]
      val categoryListFuture = (database ? RequestAllCategories).mapTo[CategoryList]
      val userQuestionAnswerTupleFuture = (database ? RequestAllAnswerEvents).mapTo[AllAnswerEvents]

      for {
        questionCategoryWeightTupleList <- qcwtFuture
        categoryList <- categoryListFuture
        allAnswerEvents <- userQuestionAnswerTupleFuture
      } {
        val initMessage = InitMessage(interviewId, userId, restrictedCategoryList, questionCategoryWeightTupleList, categoryList, allAnswerEvents)
        self ! initMessage
      }
    case (initMessage: InitMessage) =>

      val interviewActor = interviewActors.getOrElse(initMessage.userId, {
        val newInterviewActor = context.actorOf(RandomInterview.props(initMessage))
        interviewActors = interviewActors + (initMessage.userId -> newInterviewActor)
        newInterviewActor
      })

      context become ready(interviewActor)
      unstashAll()

    case x =>
      stash

  }

  def ready(interview: ActorRef): Receive = {

    case TestReportRequest(id) =>
      //Test Report burada hesaplanabilir :m
      interview forward TestReport(1, 1, Map(1.toLong -> 1.5))

    case x =>
      println(s"InterviewManager : Ready : Bunu interview halletsin : $x")
      interview forward x
  }

  override def preStart() = {
    println("InterviewManager: preStart")

  }
}

object InterviewManager {

  def props(database: ActorRef) = Props(classOf[InterviewManager], database)

}