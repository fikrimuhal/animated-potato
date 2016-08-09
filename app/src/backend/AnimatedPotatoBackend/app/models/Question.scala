package models

import utils.{Constants, DatabaseConfig}
import slick.driver.PostgresDriver.simple._
import utils.Formatter._

/**
  * Created by who on 08.08.2016.
  */
case class Question(id : Option[Int],
                    title: String,
                    qtype: String,
                    opts: List[Int] = Nil,
                    setList: List[String] = Nil) {
  require(title.length <= 255 && qtype.length <= 255)
}

case class QuestionResponse(id: Option[Int],
                            title: String,
                            qtype: String,
                            opts: List[QuestionOption] = Nil,
                            setList: List[String] = Nil) {


  require(title.length <= 255 && qtype.length <= 255)
}

object Questions {
  lazy val questions = TableQuery[Questions]
  lazy val questionOptions = TableQuery[QuestionOptions]

  def insert(question: Question): Boolean = DatabaseConfig.DB.withSession { implicit session =>
    try {
      questions += question; true
    }
    catch {
      case e: Exception => false
    }
  }

  def update(question: Question): Boolean = DatabaseConfig.DB.withSession { implicit session =>
    val updatedRowCount: Int = questions.filter(_.id === question.id).update(question)
    if (updatedRowCount > 0) true else false
  }

  def delete(question: Question): Boolean = DatabaseConfig.DB.withSession { implicit session =>
    val deletedRowCount: Int = questions.filter(_.id === question.id).delete
    if (deletedRowCount > 0) true else false
  }

  //henüz test edilmedi: 8 Ağustos 2016
  def getQuestions(): List[QuestionResponse] = DatabaseConfig.DB.withSession { implicit session =>

    val questionList: List[Question] = questions.list
    for (q <- questionList) yield QuestionResponse(q.id,
      q.title,
      q.qtype,
      questionOptions.filter(qopt => qopt.id inSet q.opts).list,
      q.setList)
  }
  // henüz test edilmedi
  def getQuestionById(id: Int): QuestionResponse = DatabaseConfig.DB.withSession { implicit session =>
    val questionList: List[Question] = questions.filter(_.id === id).list
    if (questionList == Nil) QuestionResponse(Some(-1), "", "", Nil, Nil)
    else {
      val q: Question = questionList.head
      QuestionResponse(q.id,
        q.title,
        q.qtype,
        questionOptions.filter(qopt => qopt.id inSet q.opts).list,
        q.setList
      )
    }
  }

}

class Questions(tag: Tag) extends Table[Question](tag, "question") {

  def id = column[Int]("id", O.PrimaryKey,O.AutoInc)

  def title = column[String]("title")

  def qtype = column[String]("qtype")

  def opts = column[List[Int]]("opts")

  def setList = column[List[String]]("setlist")

  def * = (id.?,title, qtype, opts, setList) <> (Question.tupled, Question.unapply)
}


