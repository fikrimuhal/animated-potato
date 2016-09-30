package core

import animatedPotato.protocol.protocol._

trait BaseModel {
  val id: Option[IdType]
  val isDeleted: Option[Boolean] = Some(false)
}
