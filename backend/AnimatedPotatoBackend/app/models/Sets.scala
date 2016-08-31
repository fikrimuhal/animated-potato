package models

import animatedPotato.protocol.protocol.IdType
import play.api.libs.json.{Format, Json, Reads, Writes}
import utils.{Constants, DB}

import slick.driver.PostgresDriver.simple._
import utils.Formatter._


case class Sets(id: Option[Int], title: String, isDefaultSet : Boolean)

object SetsDAO  {

  lazy val setsDAO = TableQuery[SetsDAO]

  def insert(set: Sets): Boolean = DB { implicit session =>
    try {
      setsDAO += set; true
    }
    catch {
      case e: Exception =>
        println(e)
        false
    }
  }

  def update(set: Sets): Boolean = DB { implicit session =>
    val updatedRowCount: Int = setsDAO.filter(_.id === set.id).update(set)
    if (updatedRowCount > 0) true else false
  }

  def delete(set: Sets): Boolean = DB { implicit session =>
    val deletedRowCount: Int = setsDAO.filter(_.id === set.id).delete
    if (deletedRowCount > 0) true else false
  }

  def getAllSets(): List[Sets] = DB { implicit session =>
      setsDAO.list
  }

  def getSet(n: Int): Sets = DB { implicit session =>
    val setList = setsDAO.filter(_.id === n).list
    if (setList.nonEmpty) setList.head
    else Sets(Some(-1),"",false)
  }

  def getSets(n: List[Int]): Sets = DB { implicit session =>
    val setList = setsDAO.filter(_.id inSet n).list
    if (setList.nonEmpty) setList.head
    else Sets(Some(-1),"",false)
  }

}

class SetsDAO(tag: Tag) extends Table[Sets](tag, "sets") {

  def id = column[Int]("id", O.PrimaryKey, O.AutoInc)

  def title = column[String]("title")

  def isdefaultset = column[Boolean]("isdefaultset")

  def * = (id.?, title,isdefaultset) <> (Sets.tupled, Sets.unapply)
}