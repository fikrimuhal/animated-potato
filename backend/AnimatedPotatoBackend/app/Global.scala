import models.{Participant, Participants, User, Users}
import play.api.{Application, GlobalSettings}

object Global extends GlobalSettings {
  override def onStart(app: Application) {
    Users.insert(User(None, "admin", "admin", Some("admin@admin.com"), Some(true), Some(true)))
    println("asdasd")
    Participants.insert(Participant(None,"admin","admin","admin","admin@admin.com","99999999999"))
  }

}