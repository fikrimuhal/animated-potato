package dao

import animatedPotato.protocol.protocol.{IdType, QuestionId}
import core.BaseDAO
import models._
import models.InterviewDAO.InterviewId
import table.AnswerTable
import utils.{Constants, DB}

import slick.driver.PostgresDriver.simple._
import scala.slick.lifted.TableQuery

case class InterviewAnswers(interviewId: InterviewId, participantId: IdType, name: String, lastName: String, answers: List[QuestionAnswer])

case class QuestionAnswer(question: QuestionTable, value: Double)

class AnswerDAO extends BaseDAO[AnswerTable, Answer](TableQuery[AnswerTable]) {

  lazy val answerDAO = TableQuery[AnswerTable]

  /**
    * @param interviewId : specified interview ID
    * @param questionId  : specified question ID
    * @return
    */
  def get(interviewId: InterviewId, questionId: QuestionId): Option[Answer] = DB { implicit session =>

    answerDAO.filter(a => a.interviewId === interviewId && a.questionId === questionId).firstOption

  }

  def getAllQuestionAnswer(interviewId: InterviewId): List[InterviewAnswers] = DB { implicit session =>
    implicit def bool2int(b: Boolean) = if (b) 1 else 0
    val UNQUESTIONED = -1.0
    val TRUE = 1.0
    val PERSONNEL = "PERSONNEL"
    val ALL = "ALL"
    val PERSONNEL_INTERVIEW_ID = -2
    val ALL_INTERVIEW_ID = -4

    val participant = ParticipantDAO.getByInterviewID(interviewId)
    if (participant.isEmpty) Nil
    else {
      lazy val questionDAO = TableQuery[Questions]
      val answers = answerDAO.list
      val questions: List[QuestionTable] = questionDAO.list
      val personnelInterviewIDs = InterviewDAO.getPersonnelInterviewIds
      val interviews = InterviewDAO.getRegisteredInterviews

      def getAverageQAs(questionAnswers: List[QuestionAnswer]): List[QuestionAnswer] = {
        questions.map { question =>
          val questionAnswer = questionAnswers.filter(p => p.question == question)
          val numberOfTrueAnswers = questionAnswer.count(_.value == TRUE)
          val numberOfAnsweredQuestions = questionAnswer.count(_.value != UNQUESTIONED)
          val average: Double = if (numberOfAnsweredQuestions == 0) UNQUESTIONED else numberOfTrueAnswers.toDouble / numberOfAnsweredQuestions
          QuestionAnswer(question, average)
        }
      }

      val interviewAnswers = interviews.map { itw =>
        val answerValues = questions.map { question =>
          val answer = answers.find(ans => ans.interviewId == itw.id.get & ans.questionId == question.id.get)
          if (answer.isDefined) QuestionAnswer(question, bool2int(answer.get.answer))
          else QuestionAnswer(question, UNQUESTIONED)
        }
        if (itw.id.get == interviewId) InterviewAnswers(itw.id.get, participant.get.id.get, participant.get.name, participant.get.lastname, answerValues)
        else InterviewAnswers(itw.id.get, -1, "", "", answerValues)
      }

      val personnelQuestionAnswers = interviewAnswers.filter(i => personnelInterviewIDs.contains(i.interviewId))
        .flatMap(_.answers)
      val interviewQuestionAnswers = interviewAnswers.flatMap(_.answers)

      val globalAverageQA = getAverageQAs(interviewQuestionAnswers)
      val personnelAverageQA = getAverageQAs(personnelQuestionAnswers)

      val interviewResult = interviewAnswers.find(_.interviewId == interviewId).get
      val personnelResult = InterviewAnswers(PERSONNEL_INTERVIEW_ID, PERSONNEL_INTERVIEW_ID, PERSONNEL, PERSONNEL, personnelAverageQA)
      val globalResult = InterviewAnswers(ALL_INTERVIEW_ID,ALL_INTERVIEW_ID, ALL, ALL, globalAverageQA)

      interviewResult :: personnelResult :: globalResult :: Nil
    }
  }


}
