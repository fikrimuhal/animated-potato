package services

import akka.actor.{Actor, Props}
import akka.actor.Actor.Receive

/**
  * Created by who on 10.08.2016.
  */
case class QuestionCommand(command : String, title : String, answer : String)
class InterviewActor extends  Actor{
  println("interview Actor başladı")

  override def receive: Receive = {
    case "next question" => sender ! 1
    case 1 => sender ! 1
    case qc@QuestionCommand(x,"mehmet",answer) =>
    case x : QuestionCommand =>
    case  x:List[Int] =>
    case 1::2::Nil =>
    case List(1,2) =>
    case _::2::Nil =>
    case 1::xs =>
  }


}

object  InterviewActor{
  def props = Props[InterviewActor]
}