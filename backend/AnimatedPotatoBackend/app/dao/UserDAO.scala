package dao

import animatedPotato.protocol.protocol._
import core.BaseDAO
import models.{Participant, ParticipantDAO, User}
import org.mindrot.jbcrypt.BCrypt
import table.UserTable

import slick.driver.PostgresDriver.simple._
import utils.{Constants, DB}

import scala.slick.lifted.TableQuery

case class UserDetails(id: UserIdType, name: String, lastName: String, email: String, phone: String, photo: Option[String], isAdmin: Option[Boolean] = None)

class UserDAO extends BaseDAO[UserTable, User](TableQuery[UserTable]) {

  lazy val userDAO = TableQuery[UserTable]
  lazy val participantDAO = TableQuery[ParticipantDAO]

  override def insert(user: User): IdType = DB { implicit session =>

    (userDAO returning userDAO.map(_.id)) += user.copy(password = BCrypt.hashpw(user.password, BCrypt.gensalt()))

  }


  def isValid(email: String, password: String): Boolean = DB { implicit session =>

    userDAO.filter(u => u.email === email && !u.isDeleted).firstOption match {

      case Some(user) => BCrypt.checkpw(password, user.password)
      case _ => false

    }

  }

  def getByEmail(email: String): Option[User] = DB { implicit session =>
    userDAO.filter(u => u.email === email && !u.isDeleted).firstOption
  }

  def isAdmin(email: Email): Boolean = DB { implicit session =>
    userDAO.filter(_.email === email).map(u => u.isAdmin).first
  }

  def isPersonnel(email: Email): Boolean = DB { implicit session =>
    userDAO.filter(u => u.email === email && !u.isDeleted).map(_.isPersonnel).firstOption.getOrElse(false)
  }

  def makePersonnel(id: UserIdType): Boolean = DB { implicit session =>
    try {
      val a = userDAO.filter(u => u.id === id && !u.isDeleted).map(_.isPersonnel).update(true)
      println(a)
      a == 1
    }
    catch {
      case x =>
        println(x)
        false
    }
  }

  def makeAdmin(id: UserIdType): Boolean = DB { implicit session =>
    userDAO.filter(u => u.id === id && !u.isDeleted).map(_.isAdmin).update(true) == 1
  }

  def makeUnPersonnel(id: IdType): Boolean = DB { implicit session =>
    userDAO.filter(u => u.id === id && !u.isDeleted).map(u => (u.isPersonnel, u.isPersonnel)).update(false, false) == 1
  }

  def makeUnadmin(id: UserIdType): Boolean = DB { implicit session =>
    userDAO.filter(_.id === id).map(_.isAdmin).update(false) == 1
  }

  def getPersonnelList = DB { implicit session =>
    userDAO.filter(u => u.isPersonnel && !u.isDeleted).list
      .map(user =>
        participantDAO.filter(_.email === user.email).first)
  }

  def getAdminList: List[Participant] = DB { implicit session =>

    userDAO.filter(u => u.isAdmin && !u.isDeleted).list
      .map(user =>
        participantDAO.filter(_.email === user.email).first)
  }

  def getUsersDetailed: List[UserDetails] = DB { implicit session =>

    userDAO.filter(u => !u.isAdmin && !u.isPersonnel /*&& !u.isDeleted*/).list.
      flatMap(usr => participantDAO.filter(u => u.email === usr.email).list
        .map(p => UserDetails(usr.id.get, p.name, p.lastname, p.email, p.phone, p.photo)))

  }

  def getPersonnelsDetailed: List[UserDetails] = DB { implicit session =>
    userDAO.filter(u => u.isPersonnel && !u.isDeleted).list.flatMap(usr => participantDAO.filter(_.email === usr.email).list
      .map(p => UserDetails(usr.id.get, p.name, p.lastname, p.email, p.phone, p.photo, usr.isadmin)))
  }

  def getAdminsDetailed: List[UserDetails] = DB { implicit session =>
    userDAO.filter(u => u.isAdmin && !u.isDeleted).list.flatMap(usr => participantDAO.filter(_.email === usr.email).list
      .map(p => UserDetails(usr.id.get, p.name, p.lastname, p.email, p.phone, p.photo)))
  }

  def isEmailProper(email: String): Boolean = DB { implicit session =>
    userDAO.filter(_.email === email).firstOption.isEmpty

  }

}
