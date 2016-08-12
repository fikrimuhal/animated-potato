package models

import com.sun.xml.internal.bind.v2.TODO
import utils.{Constants, DatabaseConfig}

import slick.driver.PostgresDriver.simple._
import utils.Formatter._
import pdi.jwt._

/**
  * Created by who on 08.08.2016.
  */
case class QuestionCategoryRequest(categoryid: Int, weight: Double)

case class Question(id: Option[Int],
                    title: String,
                    qType: String,
                    opts: List[QuestionOption],
                    categories: List[QuestionCategoryRequest],
                    setList: List[Int])

case class QuestionTable(id: Option[Int],
                         title: String,
                         qType: String,
                         options: List[Int],
                         categories: List[Int],
                         setList: List[Int])

object Questions {
  lazy val questions = TableQuery[Questions]
  lazy val questionOptions = TableQuery[QuestionOptions]
  lazy val questionCategories = TableQuery[QuestionCategories]
  lazy val sets = TableQuery[Sets]

  def insert(question: Question): Boolean = DatabaseConfig.DB.withSession { implicit session =>

    questions += QuestionTable(question.id,
      question.title,
      question.qType,
      question.opts.flatMap(_.id),
      question.categories.map(_.categoryid),
      question.setList)
    question.categories.foreach { c => QuestionCategories.insert(QuestionCategory(question.id, c.categoryid, c.weight)) }
    Sets.updateBySetList(question.setList)
    true

  }

  def update(question: Question): Boolean = DatabaseConfig.DB.withSession { implicit session =>
    try {
      val questionTable = QuestionTable(question.id,
        question.title,
        question.qType,
        question.opts.flatMap(_.id),
        question.categories.map(_.categoryid),
        question.setList)

      val options: List[QuestionOption] = questionOptions.filter(_.questionId inSet question.opts.map(_.questionId)).list
      val willbedeletedOptions: List[Int] = options.flatMap(_.id).filterNot(question.opts.flatMap(_.id).toSet)
      question.opts.foreach { x => questionOptions.insertOrUpdate(x) }
      willbedeletedOptions.foreach { id => questionOptions.filter(x => (x.questionId === question.id) && (x.id == id)).delete }

      val currentCategories: List[QuestionCategory] = questionCategories.filter(_.questionId === question.id).list
      val willbedeletedquestionCategories = currentCategories.map(_.categoryId).filterNot(question.categories.map(_.categoryid).toSet)
      question.categories.foreach { c => questionCategories.insertOrUpdate(QuestionCategory(question.id, c.categoryid, c.weight)) }
      willbedeletedquestionCategories.foreach { id => questionCategories.filter(x => (x.questionId === question.id) && x.categoryId == id).delete }

      val currentQuestion = questions.filter(_.id === question.id).list.head
      val willdecreasedIDs = currentQuestion.setList.toSet.diff(question.setList.toSet)
      val willincreasedIDs = question.setList.toSet.diff(currentQuestion.setList.toSet)

      willbedeletedOptions.foreach(id => Sets.decreaseCount(id))
      willincreasedIDs.foreach(id => Sets.increaseCount(id))
      true
    }
    catch {
      case e: Exception => false
    }
  }

  def delete(question: Question): Boolean = DatabaseConfig.DB.withSession { implicit session =>
    val deletedRowCount: Int = questions.filter(_.id === question.id).delete
    if (deletedRowCount > 0) true else false
  }

  //henüz test edilmedi: 8 Ağustos 2016
  //  def getQuestions(): List[QuestionResponse] = TODO

  //  DatabaseConfig.DB.withSession { implicit session =>
  //
  //    val questionList: List[Question] = questions.list
  //    for (q <- questionList) yield QuestionResponse(q.id,
  //      q.title,
  //      q.qType,
  //      questionOptions.filter(qopt => qopt.id inSet q.opts).list,
  //      q.setList)
  //  }
  // henüz test edilmedi
  def getQuestionById(id: Int): Question = DatabaseConfig.DB.withSession { implicit session =>
    val qt: QuestionTable = questions.filter(_.id === id).list.head
    Question(qt.id,qt.title,qt.qType,
      questionOptions.filter(qopt => qopt.id inSet qt.options).list,
      for (q<- questionCategories.filter(qct => qct.categoryId inSet qt.categories).list)
        yield QuestionCategoryRequest(q.categoryId,q.weight),
      qt.setList
    )
//      q.title,
//      q.qType,
//      questionOptions.filter(qopt => qopt.id inSet q.opts).list,
//      q.setList
//    )

}

}

class Questions(tag: Tag) extends Table[QuestionTable](tag, "question") {

  def id = column[Int]("id", O.PrimaryKey, O.AutoInc)

  def title = column[String]("title")

  def qType = column[String]("qType")

  def options = column[List[Int]]("options")

  def categories = column[List[Int]]("categories")

  def setList = column[List[Int]]("setlist")

  def * = (id.?, title, qType, options, categories, setList) <> (QuestionTable.tupled, QuestionTable.unapply)
}


