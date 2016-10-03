package models

import animatedPotato.protocol.protocol.{Email, UserIdType}
import core.BaseModel

case class User(id: Option[UserIdType] = None,
                username: String,
                password: String,
                email: Email,
                isadmin: Option[Boolean] = Some(false),
                ispersonnel: Option[Boolean] = Some(false)) extends BaseModel

