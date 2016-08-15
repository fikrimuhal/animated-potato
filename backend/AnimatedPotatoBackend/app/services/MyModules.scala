package services

import InterviewService.InterviewActor
import com.google.inject.AbstractModule
import play.api.libs.concurrent.AkkaGuiceSupport


class RootActorModule extends AbstractModule with AkkaGuiceSupport {

  def configure = bindActor[RootActor]("root")


}

class InterviewActorModule extends AbstractModule with AkkaGuiceSupport {

  def configure = bindActor[InterviewActor]("interview")

}


