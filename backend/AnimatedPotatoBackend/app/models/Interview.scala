package models

import animatedPotato.protocol.protocol.{CategoryId, IdType, QuestionId}
import utils.{Constants, DB}

import slick.driver.PostgresDriver.simple._
import utils.Formatter._
import pdi.jwt._
import animatedPotato.protocol.protocol.IdType
import play.api.libs.json.Json

case class Interview(id: Option[IdType], email: String, hasFinished: Boolean = false)

object InterviewDAO {
  lazy val interviewDAO = TableQuery[InterviewDAO]
  type InterviewId = Long

  /**
    * @param email 
    * @return if there is a test record at interview table, returns false
    *         else inserts into interview table and returns interviewId
    */
  
  def insert(email: String): Either[Boolean, InterviewId] = DB { implicit session =>
    if (hasTested(email)) {
      Left(false)
    }
    else {
      Right(
        (interviewDAO returning interviewDAO.map(_.id)) += Interview(None, email)
      )
    }

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
    * updates hasFinished column of the specified row
    * 
    * @return if success => true
    *         else false
    */
  
  def finishTest(identifier: Either[String, InterviewId]): Boolean = DB { implicit session =>

    identifier match {
      case Left(email) =>
        interviewDAO.filter(_.email === email).map(x => x.hasFinished).update(true) == 1

      case Right(interviewId) =>
        interviewDAO.filter(_.id === interviewId).map(x => x.hasFinished).update(true) == 1

      case _ => false
    }
  }

  /**
    * @return all rows in the Interview table
    */
  def getAll: List[Interview] = DB { implicit session =>
    interviewDAO.list

  }

}

class InterviewDAO(tag: Tag) extends Table[Interview](tag, "interview") {

  def id = column[IdType]("id", O.PrimaryKey, O.AutoInc)

  def email = column[String]("email")

  def hasFinished = column[Boolean]("hasfinished")

  def * = (id.?, email, hasFinished) <> (Interview.tupled, Interview.unapply)
}