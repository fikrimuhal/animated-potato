package models

import animatedPotato.protocol.protocol.IdType
import utils.{Constants, DB}

import slick.driver.PostgresDriver.simple._
import utils.Formatter._

case class Set(id: Option[Int], title: String, count: Int,isDefaultSet : Boolean)

object Sets {
  
  lazy val sets = TableQuery[Sets]

  def insert(set: Set): Boolean = DB { implicit session =>
    try {
      sets += set; true
    }
    catch {
      case e: Exception => false
    }
  }

  def update(set: Set): Boolean = DB { implicit session =>
    val updatedRowCount: Int = sets.filter(_.id === set.id).update(set)
    if (updatedRowCount > 0) true else false
  }
  def updateBySetList(ids : List[Int]): Boolean = DB{ implicit session =>
    val setss: List[Set] = sets.filter(_.id inSet ids).list
    setss.foreach{ s => sets.update(s.copy(count = s.count +1))}
    true
  }

  def delete(set: Set): Boolean = DB { implicit session =>
    val deletedRowCount: Int = sets.filter(_.id === set.id).delete
    if (deletedRowCount > 0) true else false
  }

  def getAllSets(): List[Set] = DB { implicit session =>
      sets.list
  }

  def getSet(n: Int): Set = DB { implicit session =>
    val setList = sets.filter(_.id === n).list
    if (setList.nonEmpty) setList.head
    else Set(Some(-1),"",-1,false)
  }

  def getSets(n: List[Int]): Set = DB { implicit session =>
    val setList = sets.filter(_.id inSet n).list
    if (setList.nonEmpty) setList.head
    else Set(Some(-1),"",-1,false)
  }

  def decreaseCount(id : Int) = DB{ implicit session =>
    val set: Set = sets.filter(_.id === id).list.head
    sets.filter(_.id === id).update(set.copy(count = set.count -1))
  }

  def increaseCount(id : Int) = DB{ implicit session =>
    val set: Set = sets.filter(_.id === id).list.head
    sets.filter(_.id === id).update(set.copy(count = set.count +1))
  }

}

class Sets(tag: Tag) extends Table[Set](tag, "sets") {

  def id = column[Int]("id", O.PrimaryKey, O.AutoInc)

  def title = column[String]("title")

  def count = column[Int]("count")

  def isdefaultset = column[Boolean]("isdefaultset")

  def * = (id.?, title, count,isdefaultset) <> (Set.tupled, Set.unapply)
}