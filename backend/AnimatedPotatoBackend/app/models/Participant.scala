package models

import java.sql.Timestamp
import animatedPotato.protocol.protocol.{Email, IdType, Score, UserIdType}
import dao.UserDAO
import models.InterviewDAO.InterviewId
import utils.DB
import slick.driver.PostgresDriver.simple._

case class Participant(id: Option[UserIdType] = None,
                       name: String,
                       lastname: String,
                       email: String,
                       phone: String,
                       photo: Option[String] = Some(""),
                       website: Option[String] = Some(""),
                       notes: Option[String] = Some(""))

case class ParticipantResponse(participantList: List[Participant], page: Int, numberOfPages: Int)

case class Applicant(info: Participant, applyDate: Timestamp, averageScore: Score, interviewId: InterviewId)

case class ClaimData(email: Email, isAdmin: Boolean, isPersonnel: Boolean)

object ParticipantDAO {

  lazy val participantDAO = TableQuery[ParticipantDAO]
  final val UserDAO = new UserDAO

  def insert(participant: Participant): Boolean = DB { implicit session =>
    if (exists(participant)) false
    else (participantDAO += participant) == 1
  }

  def exists(participant: Participant): Boolean = DB { implicit session =>
    participantDAO.filter(p => p.email === participant.email).list.nonEmpty
  }

  def update(participant: Participant): Boolean = DB { implicit session =>
    participantDAO.filter(_.email === participant.email).update(participant) > 0
  }

  def delete(participant: Participant): Boolean = DB { implicit session =>
    participantDAO.filter(_.email === participant.email).delete > 0
  }

  def getApplicants: List[Applicant] = DB { implicit session =>

    val interviews = InterviewDAO.interviewDAO.filter(_.hasFinished).list
    // aynı kullanıcı birden fazla test çözdüyse en son çözdüğünü filtrelemek için yazıldı
    val lastInterviewIDs: List[IdType] = interviews.groupBy(_.email).values.toList.
      map(i => i.sortBy(_.startDate.get.getTime).last.id.get)
    val filteredInterviews = interviews.filter(i => lastInterviewIDs.contains(i.id.get))
    val participantList = participantDAO.filter(_.email inSet filteredInterviews.map(_.email)).list

    //yalnızca üye olanların bilgileri getirilecek şekilde filtrelendi
    filteredInterviews.filter(i => participantList.exists(_.email == i.email)).map(itw =>
      Applicant(participantList.filter(_.email == itw.email).head, itw.startDate.get, itw.averageScore.get, itw.id.get))
  }


  def get(email: String): Option[Participant] = DB { implicit session =>
    participantDAO.filter(p => p.email === email)
      .firstOption

  }

  def getByEmailList(emails: List[Email]) = DB { implicit session =>
    participantDAO.filter(_.email inSet emails).list

  }

  def getAll = DB { implicit session =>
    participantDAO.list
  }

  def getClaimData(email: String): Option[ClaimData] = DB { implicit session =>

    participantDAO.filter(p => p.email === email).list.headOption match {

      case Some(p) => UserDAO.getByEmail(p.email).map(u => ClaimData(u.email, u.isadmin.get, u.ispersonnel.get))

      case None => None

    }
  }

  def getByInterviewID(interviewId: InterviewId): Option[Participant] = DB { implicit session =>

    val interviewOpt = InterviewDAO.interviewDAO.filter(_.id === interviewId).firstOption
    if(interviewOpt.isDefined) participantDAO.filter(_.email === interviewOpt.get.email).firstOption
    else None
  }

}

class ParticipantDAO(tag: Tag) extends Table[Participant](tag, "participant") {
  def id = column[UserIdType]("id", O.PrimaryKey, O.AutoInc)

  def name = column[String]("name")

  def lastName = column[String]("lastname")

  def email = column[Email]("email")

  def phone = column[String]("phone")

  def photo = column[Option[String]]("photo")

  def website = column[Option[String]]("website")

  def notes = column[Option[String]]("notes")

  def * = (id.?, name, lastName, email, phone, photo, website, notes) <> (Participant.tupled, Participant.unapply)
}
