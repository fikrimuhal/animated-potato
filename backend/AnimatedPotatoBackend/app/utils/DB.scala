package utils

import scala.slick.jdbc.meta.MTable
import slick.driver.PostgresDriver.simple._

object DB {

  //  val URL: String = "jdbc:postgresql://localhost:5432/deneme"
  val URL: String = "jdbc:postgresql://localhost:5432/postgres"
  val USER_NAME: String = "postgres"
  val PASSWORD: String = "qweewq00"
  val DRIVER: String = "org.postgresql.Driver"
  val DB = Database.forURL(URL, USER_NAME, PASSWORD, null, DRIVER)

  def apply[T](f: Session => T): T = DB.withSession(f)

}
