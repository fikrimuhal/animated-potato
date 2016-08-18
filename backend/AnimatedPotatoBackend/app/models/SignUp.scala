package models

import animatedPotato.protocol.protocol.IdType

case class SignUp(id : Option[IdType],
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
    && phone.length <= 255
    && website.toString.length <= 255
    && notes.toString.length <= 255)
}

//
//object SignUps{
//
//  def insert(signUp: SignUp)
//
//// buraya participation ve user için transactional ekleme yapılıp LoginSignupController'daki değiştirilecek
//
//}






