package models

import animatedPotato.protocol.protocol.{Email, UserIdType}
import org.mindrot.jbcrypt.BCrypt
import utils.DB
import slick.driver.PostgresDriver.simple._

case class User(id: Option[UserIdType] = None,
                username: String,
                password: String,
                email: Option[String] = None,
                isadmin: Option[Boolean] = Some(false),
                ispersonnel: Option[Boolean] = Some(false))

case class UserDetails(id: UserIdType, name: String, lastName: String, email: String, phone: String, photo: Option[String], isAdmin: Option[Boolean] = None)

object Users {
  lazy val users = TableQuery[Users]
  lazy val participants = TableQuery[Participants]

  def insert(user: User) = DB { implicit session =>
    users += user.copy(password =  BCrypt.hashpw(user.password, BCrypt.gensalt()))
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

    val a = users.filter(u => (u.username === userNameOrEmail) || (u.email === userNameOrEmail)).list.distinct
    if (a.nonEmpty) BCrypt.checkpw(password, a.head.password)
    else false

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

  def isAdmin(userName: String): Boolean = DB { implicit session =>
    users.filter(_.username === userName).map(u => u.isAdmin).list.nonEmpty
  }

  def isPersonnel(email: Email): Boolean = DB { implicit session =>
    users.filter(u => u.email === email).map(_.isPersonnel).list.headOption.getOrElse(false)
  }

  def makePersonnel(id: UserIdType) = DB { implicit session =>
    users.filter(_.id === id).map(_.isPersonnel).update(true) == 1
  }

  def makeAdmin(id: UserIdType): Boolean = DB { implicit session =>
    users.filter(_.id === id).map(_.isAdmin).update(true) == 1
  }

  def getPersonnelList = DB { implicit session =>

    users.filter(_.isPersonnel === true).list
      .map(user =>
        Participants.participants.filter(_.username === user.username).list.head)
  }
  def getPersonnelEmails = DB{implicit session =>

  users.filter(_.isPersonnel).map(_.email).list
  }

  def getAdminList: List[Participant] = DB { implicit session =>

    users.filter(_.isAdmin === true).list
      .map(user =>
        Participants.participants.filter(_.username === user.username).list.head)
  }

  def getUsersDetailed: List[UserDetails] = DB { implicit session =>
    users.filter(u => u.isAdmin === false && u.isPersonnel === false).list.
      flatMap(usr => participants.filter(u => u.username === usr.username).list
        .map(p => UserDetails(usr.id.get, p.name, p.lastname, p.email, p.phone, p.photo)))
  }

  def getPersonnelsDetailed: List[UserDetails] = DB { implicit session =>
    users.filter(_.isPersonnel === true).list.flatMap(usr => participants.filter(_.username === usr.username).list
      .map(p => UserDetails(usr.id.get, p.name, p.lastname, p.email, p.phone, p.photo, usr.isadmin)))
  }

  def getAdminsDetailed: List[UserDetails] = DB { implicit session =>
    users.filter(_.isAdmin === true).list.flatMap(usr => participants.filter(_.username === usr.username).list
      .map(p => UserDetails(usr.id.get, p.name, p.lastname, p.email, p.phone, p.photo)))
  }


}

class Users(tag: Tag) extends Table[User](tag, "users") {
  def id = column[UserIdType]("id", O.AutoInc, O.PrimaryKey)

  def username = column[String]("username")

  def password = column[String]("password")

  def email = column[String]("email")

  def isAdmin = column[Boolean]("isadmin")

  def isPersonnel = column[Boolean]("ispersonnel")

  def * = (id.?, username, password, email.?, isAdmin.?, isPersonnel.?) <> (User.tupled, User.unapply)
}
