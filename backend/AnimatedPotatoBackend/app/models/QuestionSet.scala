package models

import animatedPotato.protocol.protocol.IdType
import play.api.libs.json.{Format, Json, Reads, Writes}
import utils.{Constants, DB}

import slick.driver.PostgresDriver.simple._
import utils.Formatter._


case class QuestionSet(id: Option[Int], title: String, count: Option[Int] = Some(0), isDefaultSet : Boolean)

object QuestionSets  {


  lazy val sets = TableQuery[QuestionSets]

  def insert(set: QuestionSet): Boolean = DB { implicit session =>
    try {
      sets += set.copy(count = Some(0)); true
    }
    catch {
      case e: Exception =>
        println(e)
        false
    }
  }

  def update(set: QuestionSet): Boolean = DB { implicit session =>
    val updatedRowCount: Int = sets.filter(_.id === set.id).update(set)
    if (updatedRowCount > 0) true else false
  }
  def updateBySetList(ids : List[Int]): Boolean = DB{ implicit session =>
    val setss: List[QuestionSet] = sets.filter(_.id inSet ids).list
    setss.foreach{ s => sets.filter(x => x.id === s.id).update(s.copy(count = Some(s.count.get +1)))}
    true
  }

  def delete(set: QuestionSet): Boolean = DB { implicit session =>
    val deletedRowCount: Int = sets.filter(_.id === set.id).delete
    if (deletedRowCount > 0) true else false
  }

  def getAllSets(): List[QuestionSet] = DB { implicit session =>
      sets.list
  }

  def getSet(n: Int): QuestionSet = DB { implicit session =>
    val setList = sets.filter(_.id === n).list
    if (setList.nonEmpty) setList.head
    else QuestionSet(Some(-1),"",Some(-1),false)
  }

  def getSets(n: List[Int]): QuestionSet = DB { implicit session =>
    val setList = sets.filter(_.id inSet n).list
    if (setList.nonEmpty) setList.head
    else QuestionSet(Some(-1),"",Some(-1),false)
  }

  def decreaseCount(id : Int) = DB{ implicit session =>
    val set: QuestionSet = sets.filter(_.id === id).list.head
    sets.filter(_.id === id).update(set.copy(count = Some(set.count.get -1)))
  }

  def increaseCount(id : Int) = DB{ implicit session =>
    val set: QuestionSet = sets.filter(_.id === id).list.head
    sets.filter(_.id === id).update(set.copy(count = Some(set.count.get +1)))
  }

}

class QuestionSets(tag: Tag) extends Table[QuestionSet](tag, "sets") {

  def id = column[Int]("id", O.PrimaryKey, O.AutoInc)

  def title = column[String]("title")

  def count = column[Int]("count")

  def isdefaultset = column[Boolean]("isdefaultset")

  def * = (id.?, title, count.?,isdefaultset) <> (QuestionSet.tupled, QuestionSet.unapply)
}