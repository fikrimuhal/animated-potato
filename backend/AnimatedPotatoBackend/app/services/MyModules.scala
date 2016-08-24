package services

import com.google.inject.AbstractModule
import play.api.libs.concurrent.AkkaGuiceSupport

class RootActorModule extends AbstractModule with AkkaGuiceSupport {

  def configure = bindActor[RootActor]("root")

}

