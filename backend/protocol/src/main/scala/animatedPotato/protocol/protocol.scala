package animatedPotato.protocol


object protocol {

  /**
    * Interview servise yollanacak, bu komuttan sonra interview
    * servisinin sonraki soruyu göndermesi gerek
    * @param answer : kullanıcıdan gelen cevap,
    */
  case class GetNextQuestion(answer: Option[YesNoAnswer] = None,interviewId: InterviewId)

  /**
    * getNextQuestion'a response olarak bunun dönmesi gerek
    *
    * @param questionId
    * @param interviewId
    */
  case class NextQuestion(questionId: QuestionId, interviewId: InterviewId,remainingQuestions: Int)

  /**
    *
    * @param interviewId
    * @param userIdentifier
    * @param restrictedCategoryList : None ise tüm kategoriler için hesaplanacak
    *                               Some(_) ise içindeki tüm parametreler için hesaplanacak
    */
  case class TestStart(interviewId: InterviewId, userIdentifier: UserIdentifier, restrictedCategoryList: Option[List[CategoryId]] = None)
  /**
    *
    * @param interviewId
    * @param userIdentifier
    */
  case class TestFinish(interviewId: InterviewId, userIdentifier: UserIdentifier)

  case class TestReport(interviewId: InterviewId, userIdentifier: UserIdentifier, scores: Map[CategoryId, Score])

  /**
    * backend interview servise yollar
    * interview servis cevap olarak TestReport yollar
    *
    * @param id
    */
  case class TestReportRequest(id: InterviewId)

  case class UserQuestionAnswerTuple(userIdentifier: UserIdentifier, questionId: QuestionId, value: Boolean)


  /**
    * interview service tarafından yollanacak
    * backend cevap olarak List[Question] döndürecek
    *
    * @param questionSetId
    */
  case class RequestQuestions(questionSetId: IdType)

  /**
    * interview service tarafından yollanacak
    * backend cevap olarak List[QuestionSet] döndürecek
    */
  case object RequestQuestionSet

  /**
    * interview service tarafından yollanacak
    * backend cevap olarak Question döndürecek
    *
    * @param questionId
    */
  case class RequestQuestion(questionId: QuestionId)

  case class QuestionCategoryWeightTuple(questionId: QuestionId,
                                         categoryId: CategoryId,
                                         weight: Double)

  /**
    *
    * backend yanıt olarak List[Category] dönecek
    */
  case object RequestAllCategories

  /**
    * interview servisi tarafından istenir
    * backend response olarak List[QuestionCategoryWeightTuple] döner
    */

  case object RequestAllQuestionCategoryWeight


  /**
    * interview serviceten geliyor
    * bu gelince aşağıdaki AllAnswerEvents yollanacak
    */
  case object RequestAllAnswerEvents

  /**
    * requestAllAnswer requesti geldiğinde
    * backend interview servisine bütün soru ve cevaplarını yollar
    *
    * @param value
    */
  case class AllAnswerEvents(value: List[UserQuestionAnswerTuple])

  type UserIdType = IdType
  type IdType = Long
  type InterviewId = Long
  type Score = Double
  type CategoryId = Long
  type QuestionOptionId = IdType
  type QuestionId = IdType
  type Email = String
  /**
    * Non registered people can be tested with their email adress
    * so interviewIdentifier can be either email or userID
    */
  type UserIdentifier = Either[Email,UserIdType]
  /**
    *
    * @param questionId
    * @param value
    */
  case class YesNoAnswer(questionId: QuestionId, value: Boolean)


  case class Question(id: Option[IdType],
                      title: String,
                      qType: String,
                      opts: List[QuestionOption],
                      categories: List[QuestionCategory],
                      setList: List[Int])

  case class QuestionOption(questionId: IdType,
                            id: Option[IdType],
                            title: String,
                            weight: Double)

  case class QuestionCategory(categoryid: CategoryId, weight: Double)
  case class Category(id: Option[IdType],category : String)
  case class Set(id: Option[Int], title: String)
  case class Answer(id : Option[IdType],userid: UserIdType, questionId: QuestionId, answer: Boolean)
  case class QuestionList(value : List[Question])
  case class CategoryList(value : List[Category])
  case class AnswerList(value : List[Answer])
  case class QuestionCategoryWeightTupleList(value : List[QuestionCategoryWeightTuple])
  case class UserQuestionAnswerTupleList(value : List[UserQuestionAnswerTuple])

}