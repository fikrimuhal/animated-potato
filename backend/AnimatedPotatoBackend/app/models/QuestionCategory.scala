package models

import utils.{Constants, DatabaseConfig}
import slick.driver.PostgresDriver.simple._
import utils.Formatter._

case class QuestionCategory(questionId : Option[Int],categoryId: Int, weight: Double)

object QuestionCategories{
  lazy val questionCategories = TableQuery[QuestionCategories]

  def insert(questionCategory: QuestionCategory): Int = DatabaseConfig.DB.withSession{ implicit session=>
    questionCategories += questionCategory
  }

  def update(questionCategory: QuestionCategory): Boolean = DatabaseConfig.DB.withSession{ implicit session=>
    questionCategories.filter(q => (q.questionId === questionCategory.questionId).&&(q.categoryId === questionCategory.categoryId) ).update(questionCategory) == 1
  }

}


class QuestionCategories(tag: Tag) extends Table[QuestionCategory](tag, "questioncategory") {

  def questionId = column[Int]("questionid")

  def categoryId = column[Int]("categoryid")

  def weight = column[Double]("weight")

  def * = (questionId.?, categoryId, weight) <> (QuestionCategory.tupled, QuestionCategory.unapply)
}