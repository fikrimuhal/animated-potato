package core

import animatedPotato.protocol.protocol._
import slick.driver.PostgresDriver.simple._
import scala.reflect.ClassTag

abstract class BaseTable[E: ClassTag](tag: Tag, tableName: String)
  extends Table[E](tag, tableName) {
  val id = column[IdType]("id", O.PrimaryKey, O.AutoInc)
  val isDeleted = column[Boolean]("isdeleted", O.Default(false))
}
