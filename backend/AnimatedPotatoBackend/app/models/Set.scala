package models

import animatedPotato.protocol.protocol.IdType
import utils.{Constants, DatabaseConfig}

import slick.driver.PostgresDriver.simple._
import utils.Formatter._

case class Set(id: Option[Int], title: String, count: Int)

object Sets {
  
  lazy val sets = TableQuery[Sets]

  def insert(set: Set): Boolean = DatabaseConfig.DB.withSession { implicit session =>
    try {
      sets += set; true
    }
    catch {
      case e: Exception => false
    }
  }

  def update(set: Set): Boolean = DatabaseConfig.DB.withSession { implicit session =>
    val updatedRowCount: Int = sets.filter(_.id === set.id).update(set)
    if (updatedRowCount > 0) true else false
  }
  def updateBySetList(ids : List[Int]): Boolean = DatabaseConfig.DB.withSession{implicit session =>
    val setss: List[Set] = sets.filter(_.id inSet ids).list
    setss.foreach{ s => sets.update(s.copy(count = s.count +1))}
    true
  }

  def delete(set: Set): Boolean = DatabaseConfig.DB.withSession { implicit session =>
    val deletedRowCount: Int = sets.filter(_.id === set.id).delete
    if (deletedRowCount > 0) true else false
  }

  def getAllSets(): List[Set] = DatabaseConfig.DB.withSession {implicit session =>
      sets.list
  }

  def getSet(n: Int): Set = DatabaseConfig.DB.withSession { implicit session =>
    val setList = sets.filter(_.id === n).list
    if (setList.nonEmpty) setList.head
    else Set(Some(-1),"",-1)
  }

  def getSets(n: List[Int]): Set = DatabaseConfig.DB.withSession { implicit session =>
    val setList = sets.filter(_.id inSet n).list
    if (setList.nonEmpty) setList.head
    else Set(Some(-1),"",-1)
  }

  def decreaseCount(id : Int) = DatabaseConfig.DB.withSession{implicit session =>
    val set: Set = sets.filter(_.id === id).list.head
    sets.filter(_.id === id).update(set.copy(count = set.count -1))
  }

  def increaseCount(id : Int) = DatabaseConfig.DB.withSession{implicit session =>
    val set: Set = sets.filter(_.id === id).list.head
    sets.filter(_.id === id).update(set.copy(count = set.count +1))
  }


}

class Sets(tag: Tag) extends Table[Set](tag, "set") {

  def id = column[Int]("id", O.PrimaryKey, O.AutoInc)

  def title = column[String]("title")

  def count = column[Int]("count")

  def * = (id.?, title, count) <> (Set.tupled, Set.unapply)
}