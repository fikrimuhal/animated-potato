package models

import java.sql.Date

import animatedPotato.protocol.protocol.IdType
import utils.{Constants, DB}

import slick.driver.PostgresDriver.simple._
import utils.Formatter._

case class Application(username : String, applicationDate: String, answerList: List[Answer], isFinished : Option[Boolean] = Some(false))

case class ApplicationTable(usename : String, applicationDate: String, answerList: List[Long],isFinished : Option[Boolean] = Some(false))

object Applications {
  lazy val applications = TableQuery[Applications]

  def insert(application: Application) = DB { implicit session =>
    applications+= ApplicationTable(application.username,application.applicationDate,application.answerList.flatMap(x => x.id),application.isFinished)
  }
  def update(application: Application) = DB { implicit session =>
    applications.filter(_.username === application.username).update(ApplicationTable(application.username,application.applicationDate,application.answerList.flatMap(x => x.id),application.isFinished))
  }
  def delete(application: Application) = DB{ implicit session =>
  applications.filter(_.username === application.username).delete
  }
  def getApplication(username : String): List[ApplicationTable] = DB{ implicit session =>
  applications.filter(_.username === username).list
  }

}

class Applications(tag: Tag) extends Table[ApplicationTable](tag, "Application") {


  def username = column[String]("username")

  def applicationDate = column[String]("applicationDate")

  def answerList = column[List[IdType]]("questionid")

  def isFinished = column[Boolean]("isFinished")

  def * = (username, applicationDate, answerList, isFinished.?) <> (ApplicationTable.tupled, ApplicationTable.unapply)

}



