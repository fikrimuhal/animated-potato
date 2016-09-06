package models

import animatedPotato.protocol.protocol.IdType
import core.BaseModel

case class Category(id: Option[IdType], category: String) extends BaseModel
