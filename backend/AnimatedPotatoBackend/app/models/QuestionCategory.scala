package models

import animatedPotato.protocol.protocol.{CategoryId, QuestionId}
import utils.{Constants, DB}

import slick.driver.PostgresDriver.simple._
import utils.Formatter._

case class QuestionCategoryRequest(id: CategoryId, weight: Double)

case class QuestionCategory(questionId: QuestionId, categoryId: CategoryId, weight: Double)

object QuestionCategories {
  lazy val questionCategories = TableQuery[QuestionCategories]

  def insert(questionCategory: QuestionCategory): Long = DB { implicit session =>
    questionCategories += questionCategory
  }

  def update(questionCategory: QuestionCategory): Boolean = DB { implicit session =>
    questionCategories.filter(q => (q.questionId === questionCategory.questionId).&&(q.categoryId === questionCategory.categoryId)).update(questionCategory) == 1
  }

  def getAll(): List[QuestionCategory] = DB { implicit session =>
    questionCategories.list
  }
}

class QuestionCategories(tag: Tag) extends Table[QuestionCategory](tag, "questioncategory") {

  def questionId = column[QuestionId]("questionid")

  def categoryId = column[CategoryId]("categoryid")

  def weight = column[Double]("weight")

  def * = (questionId, categoryId, weight) <> (QuestionCategory.tupled, QuestionCategory.unapply)
}