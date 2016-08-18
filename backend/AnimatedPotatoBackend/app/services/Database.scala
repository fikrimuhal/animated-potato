package services
import akka.actor.{Actor, Props}
import akka.actor.Actor.Receive
import animatedPotato.protocol.protocol
import animatedPotato.protocol.protocol._
import models._

import scala.slick.lifted.TableQuery

/**
  * Created by who on 16.08.2016.
  */
class Database extends Actor  {
  println("backend database constructor")
  override def receive: Receive = {

    case RequestAllQuestionCategoryWeight =>
      println("Database: RequestAllQuestionCategoryWeight geldi")
      sender ! QuestionCategoryWeightTupleList(
        QuestionCategories.getAll().map(qc => QuestionCategoryWeightTuple(qc.questionId.getOrElse(-1),qc.categoryId,qc.weight))
      )
    case RequestAllCategories =>
      println("Database: RequestAllCategories geldi")
      sender ! CategoryList(Categories.getAll().map(c => protocol.Category(c.id,c.category)))

    case RequestQuestion(id) =>
      println(s"Database: RequestQuestion($id) geldi")
      sender !  Questions.getQuestionById(id)

    case RequestAllAnswerEvents =>
      println("Database: RequestAllAnswerEvents geldi")
      sender ! AllAnswerEvents(
        Answers.getAll().map(answer => UserQuestionAnswerTuple(answer.userid,answer.questionId,answer.answer))
      )
//    case RequestAllQuestions =>
//      println("Database : RequestAllQuestions geldi")
//    sender ! AllQuestions(Questions.getAll.map(q=>protocol.Question(q.id,q.title,q.qType,
//      for(opt <- q.opts) yield protocol.QuestionOption(opt.questionId,opt.id,opt.title,opt.weight),
//      for(cat <- q.categories) yield protocol.QuestionCategory(cat.categoryid,cat.weight),
//      q.setList)))

//        case RequestQuestionSet =>
//      println("Database: RequestQuestionSet geldi")
//      sender ! Sets.getAllSets()
  }

  override def preStart = {
    println("backend database preStart")

  }
}

object Database{

  def props = Props(classOf[Database])

}
