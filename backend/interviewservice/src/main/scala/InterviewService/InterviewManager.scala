package InterviewService


import akka.actor.{Actor, ActorRef, PoisonPill, Props, Stash}
import animatedPotato.protocol.protocol.{TestFinish, _}
import akka.pattern.ask
import akka.util.Timeout

import scala.concurrent.duration._
import scala.concurrent.ExecutionContext.Implicits.global
import akka.util.Timeout._

case class InitMessage(interviewId: InterviewId, userIdentifier: UserIdentifier, restrictedCategoryList: Option[List[CategoryId]],
                       questionCategoryWeightTuple: QuestionCategoryWeightTupleList,
                       categoryList: CategoryList,
                       userQuestionAnswerTuple: AllAnswerEvents)

class InterviewManager(database: ActorRef) extends Actor with Stash {
  implicit val timeout = Timeout(5 seconds)
  println("Interview Manager: Constructor")
  var interviewActors = Map[InterviewId, ActorRef]()

  /**
    * is called by RootActor
    * calls the intended Interview implementation Actor( RandomInterview, OrderedInterview etc.)
    * returns first question of the interview
    *
    */

  override def receive: Receive = {
    // returns first question of the test
    case (TestStart(interviewId, userId, restrictedCategoryList)) =>
      println("InterviewManager: TestStart")

      val _sender = sender // RootActor

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

        val interviewActor = interviewActors.getOrElse(initMessage.interviewId,context.actorOf(RandomInterview.props(initMessage)))
        interviewActors += (initMessage.interviewId -> interviewActor)

//        interviewActor forward GetNextQuestion(interviewId = initMessage.interviewId)

        (interviewActor ? GetNextQuestion(interviewId = initMessage.interviewId))
          .mapTo[NextQuestion]
          .map(question => _sender ! question)

      }


    case x@GetNextQuestion(_, interviewId) =>
      val _sender = sender
      println("InterviewManager'a GetNextQuestion geldi")
      (interviewActors(interviewId) ? x)
        .map {
          // Interview Actor'den TestFinish gelirse TestReportRequest requesti gönder
          case TestFinish(interviewId,userIdentifier) =>
            _sender ! TestFinish(interviewId,userIdentifier)
            println("interview manager'e test finish geldi")
            interviewActors(interviewId) ! TestReportRequest(interviewId)
          case x =>
            _sender ! x
        }

    case x@TestReport(interviewId,userIdentifier,scores) =>
      database ! x
      sender ! PoisonPill
      interviewActors -= interviewId
      //  TODO : burada database actorü ile database e kaydet

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