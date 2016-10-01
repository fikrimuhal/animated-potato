package utils

import animatedPotato.protocol.protocol.IdType
import play.api.libs.json.Json

/**
  * Created by who on 26.08.2016.
  */
case class ResponseMessage(status: String, message: String,id : Option[IdType] = None)

object ResponseMessage {

  implicit val responseMessageFormat = Json.format[ResponseMessage]

}
