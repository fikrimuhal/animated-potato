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


  override def receive: Receive = {
    /**
      * is called by RootActor
      * calls the intended Interview implementation Actor( RandomInterview, OrderedInterview etc.)
      * returns first question of the interview
      *
      */
    case (TestStart(interviewId, userId, restrictedCategoryList)) =>
      println("InterviewManager: TestStart")

      val senderActor = sender() // RootActor

      val qcwtFuture = (database ? RequestAllQuestionCategoryWeight).mapTo[QuestionCategoryWeightTupleList]
      val categoryListFuture = (database ? RequestAllCategories).mapTo[CategoryList]
      val userQuestionAnswerTupleFuture = (database ? RequestAllAnswerEvents).mapTo[AllAnswerEvents]

      for {
        questionCategoryWeightTupleList <- qcwtFuture
        categoryList <- categoryListFuture
        allAnswerEvents <- userQuestionAnswerTupleFuture
      } {
        val initMessage = InitMessage(interviewId, userId, restrictedCategoryList, questionCategoryWeightTupleList, categoryList, allAnswerEvents)

        println(s"InterviewManager : initmessage : $initMessage")

        val interviewActor = interviewActors.getOrElse(initMessage.userId, {
          val newInterviewActor = context.actorOf(RandomInterview.props(initMessage))
          interviewActors += (initMessage.userId -> newInterviewActor)
          newInterviewActor
        })

        val firstQuestionFuture = (interviewActor ? GetNextQuestion(None,initMessage.interviewId)).mapTo[NextQuestion]

        for {firstQuestion <- firstQuestionFuture} {
          println(s"InterviewManager : firstQuestion :  $firstQuestion")
          senderActor ! firstQuestion
        }

      }

    case (nextQuestion: NextQuestion) =>
      println("InterviewManager'a nextQuestion geldi")
      context.parent ! nextQuestion

    case x@GetNextQuestion(answer, interviewId) =>
      println("InterviewManager'a GetNextQuestion geldi")
      interviewActors(interviewId) ? x


    case x@TestFinish(interviewId, userId) =>
      interviewActors(interviewId)


    case TestReportRequest(id) =>
      //Test Report burada hesaplanabilir :m

      id match {
        case Left(id) =>
          interviewActors(id) forward TestReport(1, 1, Map(1.toLong -> 1.5))

        case Right(id) =>
          interviewActors(id) forward TestReport(1, 1, Map(1.toLong -> 1.5))

      }

    case x =>
      println(s"InterviewManager : unexpected arg : $x")


  }

  override def preStart() = {
    println("InterviewManager: preStart")

  }
}

object InterviewManager {

  def props(database: ActorRef) = Props(classOf[InterviewManager], database)

}