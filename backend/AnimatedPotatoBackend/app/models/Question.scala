package models

import animatedPotato.protocol.protocol.{CategoryId, IdType, QuestionId}
import com.sun.xml.internal.bind.v2.TODO
import utils.{Constants, DB}

import slick.driver.PostgresDriver.simple._
import utils.Formatter._
import pdi.jwt._

/**
  * Created by who on 08.08.2016.
  */

case class QuestionCategoryResponse(id: IdType, weight: Double, text: String)

case class Question(id: Option[IdType],
                    title: String,
                    qType: String,
                    options: List[QuestionOption],
                    categoryWeights: List[QuestionCategoryRequest],
                    setList: List[IdType])

case class QuestionResponse(id: IdType,
                            title: String,
                            qType: String,
                            options: List[QuestionOption],
                            categoryWeights: List[QuestionCategoryResponse],
                            setList: List[IdType])

case class QuestionTable(id: Option[IdType],
                         title: String,
                         qType: String)

object Questions {
  lazy val questions = TableQuery[Questions]
  lazy val questionOptions = TableQuery[QuestionOptions]
  lazy val questionCategories = TableQuery[QuestionCategories]
  lazy val categories = TableQuery[Categories]
  lazy val questionSets = TableQuery[QuestionSetDAO]

  def insert(question: Question): Boolean = DB { implicit session =>

    val questionId = (questions returning questions.map(_.id)) +=
      QuestionTable(question.id, question.title, question.qType)

    question.options.foreach {
      option => QuestionOptions.insert(
        QuestionOption(Some(questionId), None, option.title, option.weight)
      )
    }

    question.categoryWeights.foreach {
      category => QuestionCategories.insert(
        QuestionCategory(questionId, category.id, category.weight)
      )
    }

    question.setList.foreach {
      setId => QuestionSetDAO.insert(
        QuestionSet(questionId, setId)
      )

    }

    true

  }

  def update(question: Question): Boolean = DB { implicit session =>
    try {
      //      val questionTable = QuestionTable(question.id,
      //        question.title,
      //        question.qType,
      //        question.options.flatMap(_.id),
      //        question.setList)
      //
      //      val options: List[QuestionOption] = questionOptions.filter(_.questionId inSet question.options.map(_.questionId)).list
      //      val willbedeletedOptions: List[IdType] = options.flatMap(_.id).filterNot(question.options.flatMap(_.id).toSet)
      //      question.options.foreach { x => questionOptions.insertOrUpdate(x) }
      //      willbedeletedOptions.foreach { id => questionOptions.filter(x => (x.questionId === question.id) && (x.id === id)).delete }
      //
      //      val currentCategories: List[QuestionCategory] = questionCategories.filter(_.questionId === question.id).list
      //      val willbedeletedquestionCategories = currentCategories.map(_.categoryId).filterNot(question.categoryWeights.map(_.id).toSet)
      //      question.categoryWeights.foreach { c => questionCategories.insertOrUpdate(QuestionCategory(question.id, c.id, c.weight)) }
      //      willbedeletedquestionCategories.foreach { id => questionCategories.filter(x => (x.questionId === question.id) && x.categoryId == id).delete }
      //
      //      val currentQuestion = questions.filter(_.id === question.id).list.head
      //      val willdecreasedIDs = currentQuestion.setList.toSet.diff(question.setList.toSet)
      //      val willincreasedIDs = question.setList.toSet.diff(currentQuestion.setList.toSet)
      //
      //      willbedeletedOptions.foreach(id => QuestionSets.decreaseCount(id.toInt))
      //      willincreasedIDs.foreach(id => QuestionSets.increaseCount(id))
      true
    }
    catch {
      case e: Exception => false
    }
  }

  def delete(questionId: QuestionId): Boolean = DB { implicit session =>
    val deletedRowCount: Int = questions.filter(_.id === questionId).delete
    if (deletedRowCount > 0) true else false
  }

  def getAll = DB { implicit session =>

    for (question <- questions.list)
      yield
        QuestionResponse(
          question.id.get,
          question.title,
          question.qType,
          question.id.map(questionId => questionOptions.filter(option => option.questionId === questionId).list).get,
          question.id.map(questionId => questionCategories.filter(questionCategory => questionCategory.questionId === questionId).list.
            map(a => QuestionCategoryResponse(a.categoryId, a.weight, categories.filter(_.id === a.categoryId).list.head.category))).get,
          question.id.map(questionId => questionSets.filter(questionSet => questionSet.questionId === questionId).list.map(_.setId)).get
        )

  }

  def getQuestionById(id: Long): Option[QuestionResponse] = DB { implicit session =>

    questions.filter(_.id === id).list.headOption match {

      case Some(question) =>
        Some(QuestionResponse(
          question.id.get,
          question.title,
          question.qType,
          question.id.map(questionId => questionOptions.filter(option => option.questionId === questionId).list).get,
          question.id.map(questionId => questionCategories.filter(questionCategory => questionCategory.questionId === questionId).list.
            map(a => QuestionCategoryResponse(a.categoryId, a.weight, categories.filter(_.id === a.categoryId).list.head.category))).get,
          question.id.map(questionId => questionSets.filter(questionSet => questionSet.questionId === questionId).list.map(_.setId)).get
        ))

      case _ => None
    }
  }

}

class Questions(tag: Tag) extends Table[QuestionTable](tag, "question") {

  def id = column[IdType]("id", O.PrimaryKey, O.AutoInc)

  def title = column[String]("title")

  def qType = column[String]("qtype")


  def * = (id.?, title, qType) <> (QuestionTable.tupled, QuestionTable.unapply)
}


