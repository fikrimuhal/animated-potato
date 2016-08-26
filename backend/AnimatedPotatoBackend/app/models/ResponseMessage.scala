package models

import play.api.libs.json.Json

/**
  * Created by who on 26.08.2016.
  */
case class ResponseMessage(status : String, message: String)

object ResponseMessage{

  implicit val responseMessageFormat = Json.format[ResponseMessage]

}
