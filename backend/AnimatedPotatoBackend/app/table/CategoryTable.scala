package table

import core.BaseTable
import models.Category
import slick.driver.PostgresDriver.simple._

class CategoryTable(tag: Tag) extends BaseTable[Category](tag, "category") {

  def name = column[String]("name")

  def * = (id.?, name) <> (Category.tupled, Category.unapply)
}
