
// @GENERATOR:play-routes-compiler
// @SOURCE:/home/who/IdeaProjects/animated-potato/AnimatedPotatoBackend/conf/routes
// @DATE:Tue Aug 09 13:47:09 EEST 2016


package router {
  object RoutesPrefix {
    private var _prefix: String = "/"
    def setPrefix(p: String): Unit = {
      _prefix = p
    }
    def prefix: String = _prefix
    val byNamePrefix: Function0[String] = { () => prefix }
  }
}
