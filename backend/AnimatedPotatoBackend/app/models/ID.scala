package models

import animatedPotato.protocol.protocol._
import play.api.libs.json.Json

case class ID(id: IdType)

object ID {
  implicit val IDFormat = Json.format[ID]
}
