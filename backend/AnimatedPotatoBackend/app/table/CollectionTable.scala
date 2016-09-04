package table

import slick.driver.PostgresDriver.simple._
import core.BaseTable
import models.Collection

class CollectionTable(tag: Tag) extends BaseTable[Collection](tag, "collection") {

  def title = column[String]("title")

  def isDefaultSet = column[Boolean]("isdefaultset")

  def * = (id.?, title, isDefaultSet) <> (Collection.tupled, Collection.unapply)
}