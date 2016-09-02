package models

import animatedPotato.protocol.protocol.UserIdType
import com.github.t3hnar.bcrypt._
import utils.{Constants, DB}

import slick.driver.PostgresDriver.simple._
import utils.Formatter._

/**
  * Created by who on 09.08.2016.
  */
case class User(id: Option[UserIdType] = None,
                username: String,
                password: String,
                email: Option[String] = None,
                isadmin: Option[Boolean] = Some(false),
                ispersonnel: Option[Boolean] = Some(false))

object Users {
  lazy val users = TableQuery[Users]

  def insert(user: User) = DB { implicit session =>
    users += user.copy(password = user.password.bcrypt)
  }

  def exists(user: User): Boolean = DB { implicit session =>
    try {
      users.filter(u => (u.username === user.username) && (u.email === user.email)).list.nonEmpty
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

  def isValid(userNameOrEmail: String, password: String): Boolean = DB { implicit session =>
    try {
      val a = users.filter(u => (u.username === userNameOrEmail) || (u.email === userNameOrEmail)).list.distinct
      if (a.nonEmpty) {
        password.isBcrypted(a.head.password)
      }
      else false
    }
    catch {
      case e: Exception => false
    }
  }

  def get(usernameOrEmail: String): Option[User] = DB { implicit session =>
    users.filter(u => (u.username === usernameOrEmail) || (u.email === usernameOrEmail)).list.distinct match {
      case x :: xs => Some(x)
      case _ => None
    }
  }

  def getById(id: UserIdType): User = DB { implicit session =>
    users.filter(_.id === id).list.head
  }

  def getAll: List[User] = DB { implicit session =>
    users.list
  }

  def isAdmin(user: User): Boolean = DB { implicit session =>
    users.filter(_.username === user.username).map(u => u.isadmin).list.head
  }

  def makePersonnel(id: UserIdType) = DB { implicit session =>
    val filtered = users.filter(_.id === id)
    val user = filtered.list.head
    filtered.update(user.copy(ispersonnel = Some(true)))
  }

  def makeAdmin(id: UserIdType) = DB { implicit session =>
    val filtered = users.filter(_.id === id)
    val user = filtered.list.head
    filtered.update(user.copy(isadmin = Some(true)))
  }

  def getPersonnelList = DB { implicit session =>

      users.filter(_.ispersonnel === true).list
        .map(user =>
          Participants.participants.filter(_.username === user.username).list.head)
  }

  def getAdminList: List[Participant] = DB { implicit session =>

    users.filter(_.isadmin === true).list
      .map(user =>
        Participants.participants.filter(_.username === user.username).list.head)

  }
}

class Users(tag: Tag) extends Table[User](tag, "users") {
  def id = column[UserIdType]("id", O.AutoInc, O.PrimaryKey)

  def username = column[String]("username")

  def password = column[String]("password")

  def email = column[String]("email")

  def isadmin = column[Boolean]("isadmin")

  def ispersonnel = column[Boolean]("ispersonnel")

  def * = (id.?, username, password, email.?, isadmin.?, ispersonnel.?) <> (User.tupled, User.unapply)
}
