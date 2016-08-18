package services

import InterviewService.{InterviewActor, InterviewManager}
import com.google.inject.AbstractModule
import play.api.libs.concurrent.AkkaGuiceSupport


class RootActorModule extends AbstractModule with AkkaGuiceSupport {

  def configure = bindActor[RootActor]("root")


}

class InterviewActorModule extends AbstractModule with AkkaGuiceSupport {

  def configure = bindActor[InterviewActor]("interview")

}

class DatabaseActorModule extends AbstractModule with AkkaGuiceSupport {

  def configure = bindActor[Database]("database")

}

class InterviewManagerModule extends AbstractModule with AkkaGuiceSupport {

  def configure = bindActor[InterviewManager]("interviewmanager")

}


