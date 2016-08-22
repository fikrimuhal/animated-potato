package models

import animatedPotato.protocol.protocol.UserIdType
import utils.{Constants, DB}

import slick.driver.PostgresDriver.simple._


case class Participant(id: Option[UserIdType],
                       username: String,
                       name: String,
                       lastname: String,
                       email: String,
                       phone: String,
                       photo: Option[String] = Some(""),
                       website: Option[String] = Some(""),
                       notes: Option[String] = Some("")) {
  require(name.length <= 255
    && lastname.length <= 255
    && email.length <= 255
    //&& Constants.emailRegex.findFirstMatchIn(email).isDefined
    && phone.length <= 255
    && website.toString.length <= 255
    && notes.toString.length <= 255)
  //photo için db->tablo fieldı değiştirilecek ve require eklenecek
}

case class ParticipantResponse(participantList: List[Participant], page: Int, numberOfPages: Int)


object Participants {
  lazy val participants = TableQuery[Participants]

  def insert(participant: Participant): Boolean = DB { implicit session =>
    if (exists(participant)) false
    else {
      participants += participant;
      true
    }
  }

  def exists(participant: Participant): Boolean = DB { implicit session =>
    participants.filter(_.email === participant.email).list.nonEmpty
  }

  def update(participant: Participant): Boolean = DB { implicit session =>
    val updatedRowCount: Int = participants.filter(_.email === participant.email).update(participant)
    updatedRowCount > 0
  }

  def delete(participant: Participant): Boolean = DB { implicit session =>
    val deletedRowCount = participants.filter(_.email === participant.email).delete
    if (deletedRowCount > 0) true else false
  }

  def getParticipants(): List[Participant] = DB {
    implicit session =>
      participants.list
  }

  def getParticipantsWithPage(page: Int): ParticipantResponse = DB { implicit session =>
    val participantList = participants
      .sortBy(p => (p.name, p.lastname))
      .drop(page * 20)
      .take((page + 1) * 20)
      .list
    ParticipantResponse(participantList, page + 1, ((participantList.length / Constants.PAGE_SIZE) + 1))
  }

  def getParticipant(userName: String): Option[Participant] = DB { implicit session =>
    val participantList: List[Participant] = participants.filter(_.username === userName).list
    if (participantList.nonEmpty) Some(participantList.head)
    else None
  }

}

class Participants(tag: Tag) extends Table[Participant](tag, "participant") {
  def id = column[UserIdType]("id", O.PrimaryKey, O.AutoInc)

  def username = column[String]("username")

  def name = column[String]("name")

  def lastname = column[String]("lastname")

  def email = column[String]("email")

  def phone = column[String]("phone")

  def photo = column[Option[String]]("photo")

  def website = column[Option[String]]("website")

  def notes = column[Option[String]]("notes")

  def * = (id.?, username, name, lastname, email, phone, photo, website, notes) <> (Participant.tupled, Participant.unapply)
}
