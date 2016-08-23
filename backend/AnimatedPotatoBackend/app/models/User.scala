package models

import animatedPotato.protocol.protocol.UserIdType
import com.github.t3hnar.bcrypt._
import utils.{Constants, DB}

import slick.driver.PostgresDriver.simple._
import utils.Formatter._

/**
  * Created by who on 09.08.2016.
  */
case class User(id : Option[UserIdType],username : String, password: String, isadmin : Option[Boolean] = Some(false))

object Users {
  lazy val users = TableQuery[Users]

  def insert(user: User): Boolean = DB { implicit session =>
    try {
      if (exists(user)) false
      else {
        users += user.copy(password = user.password.bcrypt);
        true
      }
    }
    catch {
      case e: Exception => println(s"hataa $e")
        false
    }
  }

  def exists(user: User): Boolean = DB { implicit session =>
    try {
      users.filter(_.username === user.username).list.nonEmpty
    }
    catch {
      case e: Exception => false
    }
  }

  def update(user: User): Boolean = DB { implicit session =>
    val updatedRowCount: Int = users.filter(_.username === user.username).update(user)
    if (updatedRowCount > 0) true else false
  }

  def delete(user: User): Boolean = DB { implicit session =>
    val deletedRowCount: Int = users.filter(_.username === user.username).delete
    if (deletedRowCount > 0) true else false
  }

  def isValid(user : User): Boolean = DB{ implicit session =>
    try{users.filter(u => u.username === user.username && u.password === user.password.bcrypt).list.nonEmpty}
    catch {case e : Exception => false}
  }
  def getUserByName(username : String) : User = DB{ implicit session =>
    users.filter(_.username === username).list.head
  }

}

class Users(tag: Tag) extends Table[User](tag, "usera") {
  def id = column[UserIdType]("id",O.AutoInc,O.PrimaryKey)
  def username = column[String]("username")
  def password = column[String]("password")
  def isadmin = column[Boolean]("isadmin")

  def * = (id.?,username, password,isadmin.?) <> (User.tupled, User.unapply)
}
