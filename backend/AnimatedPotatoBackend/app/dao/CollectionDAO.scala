package dao

import animatedPotato.protocol.protocol._
import core.BaseDAO
import models.{Collection, CollectionResponse, QuestionSetDAO}
import table.CollectionTable

import slick.driver.PostgresDriver.simple._
import utils.DB

import scala.slick.lifted.TableQuery

class CollectionDAO extends BaseDAO[CollectionTable, Collection](TableQuery[CollectionTable]) {

  lazy val collectionDAO = TableQuery[CollectionTable]
  lazy val questionSetDAO = TableQuery[QuestionSetDAO]

  def makeDefaultCollection(id: IdType): Boolean = DB.DB.withTransaction { implicit session =>
    collectionDAO.filter(c => c.isDefaultSet === true && c.isDeleted === false).map(_.isDefaultSet).update(false)
    val isChanged = collectionDAO.filter(_.id === id).map(_.isDefaultSet).update(true) == 1
    if (!isChanged) session.rollback
    isChanged
  }

  def getAllDetailed: List[CollectionResponse] = DB { implicit session =>
    super.getAll.
      map(c =>
        CollectionResponse(c.id.get,
          c.title,
          questionSetDAO.filter(_.setId === c.id).list.length,
          c.isDefaultSet))

  }
}