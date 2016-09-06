package models

import animatedPotato.protocol.protocol._
import play.api.libs.json.Json

/**
  * Created by who on 29.08.2016.
  */
case class ID(id : IdType)

object ID {
  implicit val IDFormat = Json.format[ID]
}
