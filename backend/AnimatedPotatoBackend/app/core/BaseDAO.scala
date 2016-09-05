package core

import utils.DB
import scala.reflect.ClassTag
import scala.slick.lifted.TableQuery
import slick.driver.PostgresDriver.simple._

abstract class BaseDAO[T <: BaseTable[E], E <: BaseModel : ClassTag](tableDAO: TableQuery[T]) {

  def insert(row: E) = DB { implicit session =>
    (tableDAO returning tableDAO.map(_.id)) += row
  }

  def update(row: E) = DB { implicit session =>
    tableDAO.filter(_.id === row.id).update(row)
  }

  def delete(row: E) = DB { implicit session =>
    tableDAO.filter(_.id === row.id).map(_.isDeleted).update(true)
  }

  def getAll = DB { implicit session =>
    tableDAO.filter(_.isDeleted === false).list
  }

}