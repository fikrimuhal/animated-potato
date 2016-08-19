package InterviewService

import akka.actor.{Actor, ActorRef, Props, Stash}
import akka.actor.Actor.Receive
import animatedPotato.protocol.protocol._
import akka.pattern.ask
import akka.util.Timeout
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

    case (x: String,TestStart(interviewId, userId, restrictedCategoryList)) =>

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
        self ! (x,initMessage)
      }
    case (x:String,initMessage: InitMessage) =>
      val interview: ActorRef = if (x == "random") {
        context.actorOf(RandomInterview.props(initMessage), "randominterview")
      } else{
        context.actorOf(InterviewActor.props(initMessage), "interview")
      }
      context become ready(interview)
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