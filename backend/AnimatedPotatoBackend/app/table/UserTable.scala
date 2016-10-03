package table

import slick.driver.PostgresDriver.simple._
import core.BaseTable
import models.User

class UserTable(tag: Tag) extends BaseTable[User](tag, "users") {

  def username = column[String]("username")

  def password = column[String]("password")

  def email = column[String]("email")

  def isAdmin = column[Boolean]("isadmin")

  def isPersonnel = column[Boolean]("ispersonnel")

  def * = (id.?, username, password, email, isAdmin.?, isPersonnel.?) <> (User.tupled, User.unapply)
}
