import models.{Participant, ParticipantDAO, User}
import play.api.{Application, GlobalSettings}
import dao.UserDAO

object Global extends GlobalSettings {
  override def onStart(app: Application) {
    (new UserDAO).insert(User(None, "admin", "admin", "admin@admin.com", Some(true), Some(true)))
    ParticipantDAO.insert(Participant(None,"admin","admin","admin","admin@admin.com","99999999999"))
  }

}
