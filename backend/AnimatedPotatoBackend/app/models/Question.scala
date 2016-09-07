package models

import animatedPotato.protocol.protocol.{CategoryId, IdType, QuestionId}
import table.CategoryTable
import utils.DB

import slick.driver.PostgresDriver.simple._

//case class QuestionId(value : Long) extends AnyVal

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
  lazy val categories = TableQuery[CategoryTable]
  lazy val questionSets = TableQuery[QuestionSetDAO]

  def insert(question: Question): IdType = DB { implicit session =>

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

    questionId

  }

  def update(question: Question): IdType = DB { implicit session =>

    lazy val questions = TableQuery[Questions]
    lazy val questionOptions = TableQuery[QuestionOptions]
    lazy val questionCategories = TableQuery[QuestionCategories]
    lazy val questionSets = TableQuery[QuestionSetDAO]

    // question update
    questions.filter(_.id === question.id).update(QuestionTable(question.id, question.title, question.qType))
    // questionOptions update
    questionOptions.filter(qopt => qopt.id inSet question.options.map(_.id.get).toSet).delete
    question.options.foreach { qopt => questionOptions += qopt }
    //questionCategory Update
    questionCategories.filter(qct => qct.questionId === question.id).delete
    question.categoryWeights.foreach(qct => questionCategories += QuestionCategory(question.id.get, qct.id, qct.weight))
    //questionSets update
    questionSets.filter(qs => qs.questionId === question.id).delete
    question.setList.foreach(qs => QuestionSetDAO.insert(QuestionSet(question.id.get, qs)))

    question.id.get
  }

  def deleteById(questionId: QuestionId): Int = DB { implicit session =>

    lazy val questionOptions = TableQuery[QuestionOptions]
    lazy val questionCategories = TableQuery[QuestionCategories]
    lazy val questionSets = TableQuery[QuestionSetDAO]

    questions.filter(_.id === questionId).delete
    questionOptions.filter(qopt => qopt.questionId === questionId).delete
    questionCategories.filter(qct => qct.questionId === questionId).delete
    questionSets.filter(qs => qs.questionId === questionId).delete

  }

  def getAll: List[QuestionResponse] = DB { implicit session =>

    for (question <- questions.list if question != null)
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
          question.id.map(questionId => questionOptions.filter(option => option.questionId === questionId).list).orNull,
          question.id.map(questionId => questionCategories.filter(questionCategory => questionCategory.questionId === questionId).list.
            map(ctg => QuestionCategoryResponse(ctg.categoryId, ctg.weight, categories.filter(_.id === ctg.categoryId).list.headOption.map(_.category).getOrElse("")))).orNull,
          question.id.map(questionId => questionSets.filter(questionSet => questionSet.questionId === questionId).list.map(_.setId)).orNull
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