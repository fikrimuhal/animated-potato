package models

import animatedPotato.protocol.protocol.{CategoryId, IdType}
import com.sun.xml.internal.bind.v2.TODO
import utils.{Constants, DB}

import slick.driver.PostgresDriver.simple._
import utils.Formatter._
import pdi.jwt._

/**
  * Created by who on 08.08.2016.
  */
case class QuestionCategoryRequest(id: CategoryId, weight: Double)

case class Question(id: Option[IdType],
                    title: String,
                    qType: String,
                    options: List[QuestionOption],
                    categoryWeights: List[QuestionCategoryRequest],
                    setList: List[Int])

case class QuestionTable(id: Option[IdType],
                         title: String,
                         qType: String,
                         options: List[IdType],
                         setList: List[Int])

object Questions {
  lazy val questions = TableQuery[Questions]
  lazy val questionOptions = TableQuery[QuestionOptions]
  lazy val questionCategories = TableQuery[QuestionCategories]
  lazy val sets = TableQuery[QuestionSets]

  def insert(question: Question): Boolean = DB { implicit session =>

    val id = (questions returning questions.map(_.id)) += QuestionTable(question.id,
      question.title,
      question.qType,
      question.options.flatMap(_.id),
      question.setList)


    question.options.foreach{ opt => QuestionOptions.insert(QuestionOption(Some(id),None,opt.title,opt.weight)) }

    question.categoryWeights.foreach { c => QuestionCategories.insert(QuestionCategory(id, c.id, c.weight)) }

    QuestionSets.updateBySetList(question.setList)

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

  def delete(question: Question): Boolean = DB { implicit session =>
    val deletedRowCount: Int = questions.filter(_.id === question.id).delete
    if (deletedRowCount > 0) true else false
  }

  def getAll = DB { implicit session =>
    val questionList = questions.list
    for (qt <- questionList) yield
      Question(qt.id, qt.title, qt.qType,
        questionOptions.filter(qopt => qopt.id inSet qt.options).list,
        for (q <- questionCategories.filter(qct => qct.questionId === qt.id).list)
          yield QuestionCategoryRequest(q.categoryId, q.weight),
        qt.setList
      )

  }

  def getQuestionById(id: Long): Question = DB { implicit session =>
    val qt: QuestionTable = questions.filter(_.id === id.toLong).list.head
    Question(qt.id,qt.title,qt.qType,
      questionOptions.filter(qopt => qopt.id inSet qt.options).list,
      for (q<- questionCategories.filter(qct => qct.questionId === qt.id ).list)
        yield QuestionCategoryRequest(q.categoryId,q.weight),
      qt.setList
    )

}

}

class Questions(tag: Tag) extends Table[QuestionTable](tag, "question") {

  def id = column[IdType]("id", O.PrimaryKey, O.AutoInc)

  def title = column[String]("title")

  def qType = column[String]("qtype")

  def options = column[List[IdType]]("opts")

  def setList = column[List[Int]]("setlist")

  def * = (id.?, title, qType, options, setList) <> (QuestionTable.tupled, QuestionTable.unapply)
}


