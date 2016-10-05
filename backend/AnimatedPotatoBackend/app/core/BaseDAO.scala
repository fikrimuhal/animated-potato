package core

import animatedPotato.protocol.protocol.IdType
import utils.DB
import scala.reflect.ClassTag
import scala.slick.lifted.TableQuery
import slick.driver.PostgresDriver.simple._

abstract class BaseDAO[T <: BaseTable[E], E <: BaseModel : ClassTag](tableDAO: TableQuery[T]) {

  def insert(row: E): IdType = DB { implicit session =>
    (tableDAO returning tableDAO.map(_.id)) += row
  }

  def update(row: E) = DB { implicit session =>
    tableDAO.filter(_.id === row.id).update(row)
  }

  def delete(row: E) = DB { implicit session =>
    tableDAO.filter(_.id === row.id).map(_.isDeleted).update(true)
  }

  def deleteById(id: IdType): Boolean = DB { implicit session =>
    tableDAO.filter(_.id === id).map(_.isDeleted).update(true) == 1
  }

  def getById(id: IdType) = DB { implicit session =>
    tableDAO.filter(_.id === id).list
  }

  def getAll: List[E] = DB { implicit session =>
    tableDAO.filter(_.isDeleted === false).list
  }

  def insertAll(rowList: List[E]): Option[Int] = DB { implicit session =>
    tableDAO.insertAll(rowList: _*)
  }


}