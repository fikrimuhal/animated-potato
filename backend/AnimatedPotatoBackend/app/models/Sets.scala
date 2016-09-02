package models

import animatedPotato.protocol.protocol.IdType
import play.api.libs.json.{Format, Json, Reads, Writes}
import utils.{Constants, DB}

import slick.driver.PostgresDriver.simple._
import utils.Formatter._

case class Sets(id: Option[IdType] = None, title: String, isDefaultSet: Boolean)

case class SetsResponse(id: IdType, title: String, questionCount: Int, isDefaultSet: Boolean)

object SetsDAO {

  lazy val setsDAO = TableQuery[SetsDAO]
  lazy val questionSetDAO = TableQuery[QuestionSetDAO]

  def insert(set: Sets): IdType = DB { implicit session =>
    (setsDAO returning setsDAO.map(_.id)) += set
  }

  def update(set: Sets): IdType = DB { implicit session =>
    setsDAO.filter(_.id === set.id).update(set)

  }

  def delete(set: Sets): IdType = DB { implicit session =>
    setsDAO.filter(_.id === set.id).delete
  }

  def get(id: IdType): Either[Boolean, Sets] = DB { implicit session =>

    setsDAO.filter(_.id === id).list.headOption match {

      case Some(sets) => Right(sets)
      case _ => Left(false)

    }
  }

  def getAll: List[SetsResponse] = DB { implicit session =>

    setsDAO.list match {
      case x: List[Sets] =>
        x.map(set =>
          SetsResponse(set.id.get,
            set.title,
            set.id.map { id =>
              questionSetDAO.filter(_.setId === id).list.length
            }.get,
            set.isDefaultSet))

      case Nil => Nil
    }
  }


  def changeDefaultSet(id: IdType) = DB { implicit session =>

    setsDAO.filter(_.isDefaultSet === true).map(_.isDefaultSet).update(true)
    setsDAO.filter(_.id === id).map(_.isDefaultSet).update(false)

  }

}

class SetsDAO(tag: Tag) extends Table[Sets](tag, "sets") {

  def id = column[IdType]("id", O.PrimaryKey, O.AutoInc)

  def title = column[String]("title")

  def isDefaultSet = column[Boolean]("isdefaultset")

  def * = (id.?, title, isDefaultSet) <> (Sets.tupled, Sets.unapply)
}