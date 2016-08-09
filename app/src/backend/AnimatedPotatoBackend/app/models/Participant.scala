package models
import utils.{Constants, DatabaseConfig}

import slick.driver.PostgresDriver.simple._


case class Participant(id: Option[Int],
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
case class ParticipantResponse(participantList : List[Participant],page: Int, numberOfPages: Int)


object Participants {
  lazy val participants = TableQuery[Participants]

  def insert(participant: Participant): Boolean = DatabaseConfig.DB.withSession { implicit session =>
    if (exists(participant)) false
    else {
      participants += participant; true
    }
  }

  def exists(participant: Participant): Boolean = DatabaseConfig.DB.withSession { implicit session =>
    participants.filter(_.email === participant.email).list.nonEmpty
  }

  def update(participant: Participant): Boolean = DatabaseConfig.DB.withSession { implicit session =>
    val updatedRowCount: Int = participants.filter(_.email === participant.email).update(participant)
    if (updatedRowCount > 0) true else false
  }

  def delete(participant: Participant): Boolean = DatabaseConfig.DB.withSession { implicit session =>
    val deletedRowCount = participants.filter(_.email === participant.email).delete
    if (deletedRowCount > 0) true else false
  }

  def getParticipants(): List[Participant] = DatabaseConfig.DB.withSession {
    implicit session =>
      participants.list
  }

  def getParticipantsWithPage(page: Int): ParticipantResponse = DatabaseConfig.DB.withSession { implicit session =>
    val participantList = participants
      .sortBy(p => (p.name, p.lastname))
      .drop(page * 20)
      .take((page + 1) * 20)
      .list
    ParticipantResponse(participantList, page + 1, ((participantList.length / Constants.PAGE_SIZE) + 1))
  }

}

class Participants(tag: Tag) extends Table[Participant](tag, "participant") {
  def id = column[Int]("id", O.PrimaryKey, O.AutoInc)

  def name = column[String]("name")

  def lastname = column[String]("lastname")

  def email = column[String]("email")

  def phone = column[String]("phone")

  def photo = column[Option[String]]("photo")

  def website = column[Option[String]]("website")

  def notes = column[Option[String]]("notes")

  def * = (id.?,name, lastname, email, phone, photo, website, notes) <> (Participant.tupled, Participant.unapply)
}
