package models

import animatedPotato.protocol.protocol.IdType
import core.BaseModel

case class Collection(id: Option[IdType], title: String, isDefaultSet: Boolean) extends BaseModel
