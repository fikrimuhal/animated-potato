package dao

import animatedPotato.protocol.protocol.{IdType, QuestionId}
import core.BaseDAO
import models._
import models.InterviewDAO.InterviewId
import table.AnswerTable
import utils.DB

import slick.driver.PostgresDriver.simple._
import scala.slick.lifted.TableQuery

case class InterviewAnswers(interviewId: InterviewId,participantId : IdType,name : String, lastName: String, answers: List[QuestionAnswer])

case class QuestionAnswer(questionId: QuestionId, value: Int)

class AnswerDAO extends BaseDAO[AnswerTable, Answer](TableQuery[AnswerTable]) {

  lazy val answerDAO = TableQuery[AnswerTable]

  /**
    * @param interviewId : specified interview ID
    * @param questionId : specified question ID
    * @return
    */
  def get(interviewId: InterviewId, questionId: QuestionId): Option[Answer] = DB { implicit session =>

    answerDAO.filter(a => a.interviewId === interviewId && a.questionId === questionId).list.headOption

  }

  def getAllQuestionAnswer(interviewId: InterviewId) = DB { implicit session =>
    implicit def bool2int(b: Boolean) = if (b) 1 else 0
    val UNQUESTIONED = -1

    lazy val questionDAO = TableQuery[Questions]
    val answers = answerDAO.list

    val questionIDs = questionDAO.map(_.id).groupBy(x => x).map(_._1).list
    val interviews = InterviewDAO.getUserandPersonnelInterviews(interviewId)
    val participants = Participants.getByEmailList(interviews.map(_.email))

    interviews.map { itw =>

      val answerValues = questionIDs.map { q_id =>
        val answer = answers.find(ans => ans.interviewId == itw.id.get & ans.questionId == q_id)
        if (answer.isDefined) QuestionAnswer(q_id, bool2int(answer.get.answer))
        else QuestionAnswer(q_id, UNQUESTIONED)
      }
      val p = participants.filter(_.email == itw.email).head

      InterviewAnswers(itw.id.get,p.id.get,p.name,p.lastname,answerValues)
    }
  }
}
