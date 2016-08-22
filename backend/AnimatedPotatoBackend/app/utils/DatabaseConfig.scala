package utils

import slick.driver.PostgresDriver.simple._

object DatabaseConfig {

//  val URL: String = "jdbc:postgresql://localhost:5432/deneme"
  val URL: String = "jdbc:postgresql://192.168.1.61:5434/postgres"
  val USER_NAME: String = "postgres"
  val PASSWORD: String = "password"
  val DRIVER: String = "org.postgresql.Driver"
  val DB = Database.forURL(URL, USER_NAME, PASSWORD, null, DRIVER)

}
