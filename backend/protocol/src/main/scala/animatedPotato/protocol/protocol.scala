package animatedPotato.protocol


object protocol {

  /**
    * Interview servise yollanacak, bu komuttan sonra interview
    * servisinin sonraki soruyu göndermesi gerek
    *
    * @param answer : kullanıcıdan gelen cevap,
    */
  case class GetNextQuestion(answer: Answer)

  /**
    * getNextQuestion'a response olarak bunun dönmesi gerek
    *
    * @param id
    */
  case class NextQuestion(id: QuestionId)

  type IdType = Long
  type QuestionOptionId = IdType
  type QuestionId = IdType

  case class Answer(id: Option[Int], userId: Int, questionId: Int, answer: Map[QuestionOptionId, String])

  case class QuestionOption(questionId: QuestionOptionId,
                            id: Option[Int],
                            title: String,
                            weight: Double) {
    require(title.toString.length <= 255)
  }

  case class Question(id: Option[Int],
                      title: String,
                      qType: String,
                      opts: List[QuestionOption],
                      setList: List[Int])
}