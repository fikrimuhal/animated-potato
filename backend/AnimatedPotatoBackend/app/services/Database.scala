package services
import akka.actor.{Actor, Props}
import akka.actor.Actor.Receive
import animatedPotato.protocol.protocol
import animatedPotato.protocol.protocol._
import dao.CategoryDAO
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
        QuestionCategories.getAll().map(qc => QuestionCategoryWeightTuple(qc.questionId,qc.categoryId,qc.weight))
      )
    case RequestAllCategories =>
      val CategoryDAO = new CategoryDAO
      println("Database: RequestAllCategories geldi")
      sender ! CategoryList(CategoryDAO.getAll.map(c => protocol.Category(c.id,c.category)))

    case RequestQuestion(id) =>
      println(s"Database: RequestQuestion($id) geldi")
      sender !  Questions.getQuestionById(id)

    case RequestAllAnswerEvents =>
      println("Database: RequestAllAnswerEvents geldi")
      sender ! AllAnswerEvents(
        Answers.getAll().map(answer => UserQuestionAnswerTuple(
          answer.userId match {
            case Some(id) => Right(id)
            case _ => Left(answer.email.get)
          }
          ,answer.questionId,answer.answer))
      )
  }

  override def preStart = {
    println("backend database preStart")

  }
}

object Database{

  def props = Props(classOf[Database])

}
