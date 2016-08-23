package models
import animatedPotato.protocol.protocol.IdType
import utils.{Constants, DB}

import slick.driver.PostgresDriver.simple._
import utils.Formatter._
/**
  * Created by who on 09.08.2016.
  */
case class Category(id: Option[IdType],category : String)
object Categories {


  lazy val categories = TableQuery[Categories]
  
  def insert(category: Category): Boolean = DB { implicit session =>
    try {
      categories += category; true
    }
    catch {
      case e: Exception => false
    }
  }

  def update(category: Category): Boolean = DB { implicit session =>
    val updatedRowCount: Int = categories.filter(_.id === category.id).update(category)
    if (updatedRowCount > 0) true else false
  }

  def delete(category: Category): Boolean = DB { implicit session =>
    val deletedRowCount: Int = categories.filter(_.id === category.id).delete
    if (deletedRowCount > 0) true else false
  }

  def getAll(): List[Category] = DB { implicit session =>
    categories.list
  }
  def get(n: Long) : Category = DB{ implicit session =>
    val categoryList =  categories.filter(_.id === n).list
    if(categoryList != Nil) categoryList.head
    else Category(Some(-1),"")
  }
}

class Categories(tag: Tag) extends Table[Category](tag, "category") {

  def id = column[IdType]("id", O.PrimaryKey,O.AutoInc)

  def category = column[String]("category")

  def * = (id.?,category) <> (Category.tupled, Category.unapply)
}



