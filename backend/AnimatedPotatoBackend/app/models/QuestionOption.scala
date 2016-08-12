package models

import slick.driver.PostgresDriver.simple._
import utils.{Constants, DatabaseConfig}

/**
  * Created by who on 07.08.2016.
  */
case class QuestionOption(questionId: Int,
                          id: Option[Int],
                          title: String ,
                          weight: Double) {
  require(title.toString.length <= 255)
}


object QuestionOptions {
  lazy val questionOptions = TableQuery[QuestionOptions]

  def insert(questionOption: QuestionOption): Boolean = DatabaseConfig.DB.withSession { implicit session =>
    try {
      questionOptions += questionOption; true
    }
    catch {
      case e: Exception => false
    }
  }

  def update(questionOption: QuestionOption): Boolean = DatabaseConfig.DB.withSession { implicit session =>
    val updatedRowCount: Int = questionOptions.filter(_.id === questionOption.id).update(questionOption)
    if (updatedRowCount > 0) true else false
  }

  def delete(questionOption: QuestionOption): Boolean = DatabaseConfig.DB.withSession { implicit session =>

    val deletedRowCount = questionOptions.filter(_.id === questionOption.id).delete
    if (deletedRowCount > 0) true else false
  }

  def getQuestionOptions(): List[QuestionOption] = DatabaseConfig.DB.withSession { implicit session => questionOptions.list }

}

class QuestionOptions(tag: Tag) extends Table[QuestionOption](tag, "questionoption") {
  def id = column[Int]("id", O.PrimaryKey, O.AutoInc)

  def questionId = column[Int]("questionid")

  def title = column[String]("title")

  def weight = column[Double]("weight")

  def * = (questionId,id.?, title, weight) <> (QuestionOption.tupled, QuestionOption.unapply)
}





