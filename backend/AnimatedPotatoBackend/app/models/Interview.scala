package models

import java.sql.Timestamp

import animatedPotato.protocol.protocol._
import table.{AnswerTable, UserTable}
import utils.DB

import slick.driver.PostgresDriver.simple._

case class Interview(id: Option[IdType], email: String, hasFinished: Boolean = false, startDate: Option[Timestamp] = None, endDate: Option[Timestamp] = None, averageScore: Option[Score] = None)

object InterviewDAO {
  implicit def date2timestamp(date: java.util.Date): Timestamp = new java.sql.Timestamp(date.getTime)

  lazy val interviewDAO = TableQuery[InterviewDAO]
  lazy val userDAO = TableQuery[UserTable]
  lazy val answerDAO = TableQuery[AnswerTable]

  type InterviewId = Long

  /**
    * @param email
    * @return returns interviewID
    */

  def insert(email: String): InterviewId = DB { implicit session =>
    (interviewDAO returning interviewDAO.map(_.id)) += Interview(None, email, startDate = Some(new java.util.Date))
  }

  /**
    *
    * @param email
    * @return if there is a record in interview table with the email => true
    *         else false 
    */
  def hasTested(email: String): Boolean = DB { implicit session =>
    interviewDAO.filter(_.email === email).list.headOption match {
      case Some(interview) => true
      case _ => false
    }
  }

  /**
    *
    * @param identifier is Either address(String) or InterviewId(Long),
    *                   identifies unique interview record
    *
    *                   updates hasFinished column of the specified row
    * @return if success => true
    *         else false
    */

  def finishTest(identifier: Either[String, InterviewId]): Boolean = DB { implicit session =>

    identifier match {
      case Left(email) =>
        interviewDAO.filter(_.email === email).map(x => (x.hasFinished, x.endDate)).update(true, new java.util.Date) == 1

      case Right(interviewId) =>
        interviewDAO.filter(_.id === interviewId).map(x => (x.hasFinished, x.endDate)).update(true, new java.util.Date) == 1

      case _ => false
    }
  }

  /**
    * @return all rows in the Interview table
    */
  def getAll: List[Interview] = DB { implicit session =>
    interviewDAO.list

  }

  def insertAverageScore(interviewId: InterviewId, averageScore: Score) = DB { implicit session =>
    interviewDAO.filter(_.id === interviewId).map(_.averageScore).update(averageScore)
  }


  def getPersonnelInterviewIds: List[InterviewId] = DB { implicit session =>

    val personnelEmailList = userDAO.filter(u => u.isPersonnel && !u.isDeleted).map(_.email).list
    interviewDAO.filter(_.email inSet personnelEmailList).map(_.id).list
  }

  def getUserandPersonnelInterviews(interviewId: InterviewId): List[Interview] = DB { implicit session =>
    val personnelEmailList = userDAO.filter(u => u.isPersonnel && !u.isDeleted).map(_.email).list
    interviewDAO.filter(i => (i.email inSet personnelEmailList) || (i.id === interviewId)).list
  }

  def delete(interviewId: InterviewId): Boolean = DB { implicit session =>

    val deletedInterviewCount = interviewDAO.filter(_.id === interviewId).delete
    val deletedAnswerCount = answerDAO.filter(_.interviewId === interviewId).delete
    val deletedScoreCount = ScoresDAO.scoresDAO.filter(_.interviewId === interviewId).delete

    val isSuccess = (deletedInterviewCount == 1) && (deletedAnswerCount > 0) && (deletedScoreCount > 0)
    if (!isSuccess) session.rollback

    isSuccess

  }


  def getRegisteredInterviews: List[Interview] = DB { implicit session =>

    val registeredEmails = ParticipantDAO.participantDAO.map(_.email).list
    interviewDAO.filter(i => i.hasFinished && i.email.inSet(registeredEmails)).list
  }

  def getLastRegisteredInterviews: List[Interview] = DB { implicit session =>

    val registeredEmails = ParticipantDAO.participantDAO.map(_.email).list
    val registeredInterviews = interviewDAO.filter(i => i.hasFinished && i.email.inSet(registeredEmails)).list
    val lastInterviewIDs: List[IdType] = registeredInterviews.groupBy(_.email).values.toList.
      map(i => i.sortBy(_.startDate.get.getTime).last.id.get)

    registeredInterviews.filter(i => lastInterviewIDs.contains(i.id.get))
  }

  def getUserInterviews(userID: IdType) = DB { implicit session =>

    userDAO.filter(_.id === userID).firstOption match {

      case Some(user) => interviewDAO.filter(_.email === user.email).list

      case _ => Nil
    }

  }

  def getRegisteredInterviewIDs: List[IdType] = DB { implicit session =>

    val registeredEmails = ParticipantDAO.participantDAO.map(_.email).list
    interviewDAO.filter(i => i.hasFinished && i.email.inSet(registeredEmails)).map(_.id).list

  }

}

class InterviewDAO(tag: Tag) extends Table[Interview](tag, "interview") {

  def id = column[IdType]("id", O.PrimaryKey, O.AutoInc)

  def email = column[String]("email")

  def hasFinished = column[Boolean]("hasfinished")

  def startDate = column[Timestamp]("start_date")

  def endDate = column[Timestamp]("end_date")

  def averageScore = column[Score]("average_score")

  def * = (id.?, email, hasFinished, startDate.?, endDate.?, averageScore.?) <> (Interview.tupled, Interview.unapply)
}