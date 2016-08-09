
// @GENERATOR:play-routes-compiler
// @SOURCE:/home/who/IdeaProjects/animated-potato/AnimatedPotatoBackend/conf/routes
// @DATE:Tue Aug 09 13:47:09 EEST 2016

import play.api.mvc.{ QueryStringBindable, PathBindable, Call, JavascriptLiteral }
import play.core.routing.{ HandlerDef, ReverseRouteContext, queryString, dynamicString }


import _root_.controllers.Assets.Asset

// @LINE:6
package controllers {

  // @LINE:35
  class ReverseAssets(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:35
    def at(file:String): Call = {
      implicit val _rrc = new ReverseRouteContext(Map(("path", "/public")))
      Call("GET", _prefix + { _defaultPrefix } + "assets/" + implicitly[PathBindable[String]].unbind("file", file))
    }
  
  }

  // @LINE:26
  class ReverseCategoryController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:27
    def updateCategory(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "admin/updateCategory")
    }
  
    // @LINE:28
    def deleteCategory(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "admin/deleteCategory")
    }
  
    // @LINE:30
    def getCategories(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "admin/getCategories")
    }
  
    // @LINE:26
    def insertCategory(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "admin/insertCategory")
    }
  
    // @LINE:29
    def getCategory(n:String): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "admin/getCategory/" + implicitly[PathBindable[String]].unbind("n", dynamicString(n)))
    }
  
  }

  // @LINE:20
  class ReverseQuestionOptionController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:23
    def getQuestionOptions(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "admin/getQuestionOptions")
    }
  
    // @LINE:20
    def insertQuestionOption(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "admin/insertQuestionOption")
    }
  
    // @LINE:22
    def deleteQuestionOption(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "admin/deleteQuestionOption")
    }
  
    // @LINE:21
    def updateQuestionOption(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "admin/updateQuestionOption")
    }
  
  }

  // @LINE:14
  class ReverseQuestionController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:18
    def getQuestions(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "admin/getQuestions")
    }
  
    // @LINE:16
    def deleteQuestion(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "admin/deleteQuestion")
    }
  
    // @LINE:17
    def getQuestionById(n:String): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "admin/getQuestion/" + implicitly[PathBindable[String]].unbind("n", dynamicString(n)))
    }
  
    // @LINE:14
    def insertQuestion(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "admin/insertQuestion")
    }
  
    // @LINE:15
    def updateQuestion(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "admin/updateQuestion")
    }
  
  }

  // @LINE:6
  class ReverseParticipantController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:12
    def getParticipants(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "admin/getParticipants")
    }
  
    // @LINE:11
    def getParticipantswithPage(n:String): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "admin/getParticipants/" + implicitly[PathBindable[String]].unbind("n", dynamicString(n)))
    }
  
    // @LINE:10
    def deleteParticipant(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "admin/deleteParticipant")
    }
  
    // @LINE:9
    def updateParticipant(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "updateParticipant")
    }
  
    // @LINE:8
    def insertParticipant(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "insertParticipant")
    }
  
    // @LINE:6
    def index(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix)
    }
  
  }


}
