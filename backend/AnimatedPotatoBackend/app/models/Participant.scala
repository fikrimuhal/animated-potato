package models

import java.sql.Timestamp

import animatedPotato.protocol.protocol.{Email, Score, UserIdType}
import models.InterviewDAO.InterviewId
import utils.{Constants, DB}

import slick.driver.PostgresDriver.simple._


case class Participant(id: Option[UserIdType] = None,
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

case class Applicant(info: Participant, applyDate: Timestamp, averageScore: Score, interviewId: InterviewId)

case class ClaimData(userName: String, email: Email, isAdmin: Boolean, isPersonnel: Boolean, timeZone : Long)

object Participants {

  lazy val participants = TableQuery[Participants]

  def insert(participant: Participant): Boolean = DB { implicit session =>
    if (exists(participant)) false
    else (participants += participant) == 1
  }

  def exists(participant: Participant): Boolean = DB { implicit session =>
    participants.filter(p => p.email === participant.email || p.username === participant.username).list.nonEmpty
  }

  def update(participant: Participant): Boolean = DB { implicit session =>
    participants.filter(_.email === participant.email).update(participant) > 0
  }

  def delete(participant: Participant): Boolean = DB { implicit session =>
    participants.filter(_.email === participant.email).delete > 0
  }

  def getApplicants: List[Applicant] = DB { implicit session =>
    val interviews = InterviewDAO.interviewDAO.filter(_.hasFinished).list
      interviews.filter(i => getByEmail(i.email).isDefined)
      .map(itw =>
        Applicant(getByEmail(itw.email).get, itw.startDate.get, itw.averageScore.get, itw.id.get))
  }

  def getParticipantsWithPage(page: Int): ParticipantResponse = DB { implicit session =>
    val participantList = participants
      .sortBy(p => (p.name, p.lastname))
      .drop(page * 20)
      .take((page + 1) * 20)
      .list
    ParticipantResponse(participantList, page + 1, (participantList.length / Constants.PAGE_SIZE) + 1)
  }

  def getParticipant(userNameOrEmail: String): Option[Participant] = DB { implicit session =>
    participants.filter(p =>
      (p.email === userNameOrEmail) || (p.username === userNameOrEmail)
    ).list.distinct match {
      case x :: xs => Some(x)
      case _ => None
    }
  }
  def getByEmailList(emails :List[Email]) = DB { implicit session =>
  participants.filter(_.email inSet emails).list

  }

  def getAll = DB { implicit session =>
    participants.list
  }

  def getByEmail(email: String): Option[Participant] = DB { implicit session =>
    val participantList: List[Participant] = participants.filter(_.email === email).list
    participantList.headOption
  }

  def getUserNameByEmail(email: String): Option[String] = DB { implicit session =>
    participants.filter(p => (p.email === email) || (p.username === email)).list match {
      case x :: xs => Some(x.username)
      case _ => None
    }
  }

  def getClaimData(username: String): Option[ClaimData] = DB { implicit session =>

    participants.filter(p => p.username === username).list.headOption match {

      case Some(p) => Users.get(p.username).map(u => ClaimData(u.username, u.email.get, u.isadmin.get, u.ispersonnel.get,System.currentTimeMillis))

      case None => None

    }
  }

}

class Participants(tag: Tag) extends Table[Participant](tag, "participant") {
  def id = column[UserIdType]("id", O.PrimaryKey, O.AutoInc)

  def username = column[String]("username")

  def name = column[String]("name")

  def lastname = column[String]("lastname")

  def email = column[Email]("email")

  def phone = column[String]("phone")

  def photo = column[Option[String]]("photo")

  def website = column[Option[String]]("website")

  def notes = column[Option[String]]("notes")

  def * = (id.?, username, name, lastname, email, phone, photo, website, notes) <> (Participant.tupled, Participant.unapply)
}
