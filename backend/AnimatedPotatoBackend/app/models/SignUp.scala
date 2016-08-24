package models

import animatedPotato.protocol.protocol.IdType
case object UserNameExists
case object EmailExists
case object ValidUserInfo
case class SignUp(id: Option[IdType],
                  name: String,
                  lastname: String,
                  email: String,
                  phone: String,
                  photo: Option[String] = Some(""),
                  website: Option[String] = Some(""),
                  notes: Option[String] = Some(""),
                  username: String,
                  password: String
                 ) {
  require(name.length <= 255
    && lastname.length <= 255
    && email.length <= 255
    //&& Constants.emailRegex.findFirstMatchIn(email).isDefined
   // && phone.length <= 255
    && website.toString.length <= 255
    && notes.toString.length <= 255)
}



object SignUp{


  def checkUser(userName: String, email : String) ={

    checkUserName(userName) match {
      case true =>
        checkEmail(email) match{
          case true =>  ValidUserInfo
          case false => EmailExists
        }
      case false => UserNameExists

    }
  }





  def checkUserName(userName : String) : Boolean = {
    Users.get(userName) match {
      case Some(x) => false
      case None => true
    }
  }
    def checkEmail(email : String) : Boolean = {
    Users.get(email) match {
      case Some(x) => false
      case None => true
    }

  }


}






