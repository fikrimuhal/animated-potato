package models

import animatedPotato.protocol.protocol.{CategoryId, QuestionId}
import utils.{Constants, DatabaseConfig}

import slick.driver.PostgresDriver.simple._
import utils.Formatter._

case class QuestionCategory(questionId: Option[QuestionId], categoryId: CategoryId, weight: Double)

object QuestionCategories {
  lazy val questionCategories = TableQuery[QuestionCategories]

  def insert(questionCategory: QuestionCategory): Long = DatabaseConfig.DB.withSession { implicit session =>
    questionCategories += questionCategory
  }

  def update(questionCategory: QuestionCategory): Boolean = DatabaseConfig.DB.withSession { implicit session =>
    questionCategories.filter(q => (q.questionId === questionCategory.questionId).&&(q.categoryId === questionCategory.categoryId)).update(questionCategory) == 1
  }

  def getAll(): List[QuestionCategory] = DatabaseConfig.DB.withSession { implicit session =>
    questionCategories.list
  }
}

class QuestionCategories(tag: Tag) extends Table[QuestionCategory](tag, "questioncategory") {

  def questionId = column[QuestionId]("questionid")

  def categoryId = column[CategoryId]("categoryid")

  def weight = column[Double]("weight")

  def * = (questionId.?, categoryId, weight) <> (QuestionCategory.tupled, QuestionCategory.unapply)
}