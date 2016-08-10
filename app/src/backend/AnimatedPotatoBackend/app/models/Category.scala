package models
import utils.{Constants, DatabaseConfig}
import slick.driver.PostgresDriver.simple._
import utils.Formatter
/**
  * Created by who on 09.08.2016.
  */
case class Category(id: Option[Int],category : String, weight : Double)

object Categories {


  lazy val categories = TableQuery[Categories]
  
  def insert(category: Category): Boolean = DatabaseConfig.DB.withSession { implicit session =>
    try {
      categories += category; true
    }
    catch {
      case e: Exception => false
    }
  }

  def update(category: Category): Boolean = DatabaseConfig.DB.withSession { implicit session =>
    val updatedRowCount: Int = categories.filter(_.id === category.id).update(category)
    if (updatedRowCount > 0) true else false
  }

  def delete(category: Category): Boolean = DatabaseConfig.DB.withSession { implicit session =>
    val deletedRowCount: Int = categories.filter(_.id === category.id).delete
    if (deletedRowCount > 0) true else false
  }

  def getCategories(): List[Category] = DatabaseConfig.DB.withSession {
    implicit session =>
      categories.list
  }
  def getCategory(n: Int) : Category = DatabaseConfig.DB.withSession{implicit  session =>
    val categoryList =  categories.filter(_.id === n).list
    if(categoryList != Nil) categoryList.head
    else Category(Some(-1),"",-1)
  }


}

class Categories(tag: Tag) extends Table[Category](tag, "category") {

  def id = column[Int]("id", O.PrimaryKey,O.AutoInc)

  def category = column[String]("category")

  def weight = column[Double]("weight")

  def * = (id.?,category, weight) <> (Category.tupled, Category.unapply)
}



