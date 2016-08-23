package models

import animatedPotato.protocol.protocol.{CategoryId, IdType, Score, UserIdType}

case class Interview(userIdType: UserIdType,interviewId : Option[IdType], scores: Map[CategoryId, Score])



