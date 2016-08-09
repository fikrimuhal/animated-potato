
// @GENERATOR:play-routes-compiler
// @SOURCE:/home/who/IdeaProjects/animated-potato/AnimatedPotatoBackend/conf/routes
// @DATE:Tue Aug 09 13:47:09 EEST 2016

import play.api.routing.JavaScriptReverseRoute
import play.api.mvc.{ QueryStringBindable, PathBindable, Call, JavascriptLiteral }
import play.core.routing.{ HandlerDef, ReverseRouteContext, queryString, dynamicString }


import _root_.controllers.Assets.Asset

// @LINE:6
package controllers.javascript {
  import ReverseRouteContext.empty

  // @LINE:35
  class ReverseAssets(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:35
    def at: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.Assets.at",
      """
        function(file1) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "assets/" + (""" + implicitly[PathBindable[String]].javascriptUnbind + """)("file", file1)})
        }
      """
    )
  
  }

  // @LINE:26
  class ReverseCategoryController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:27
    def updateCategory: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.CategoryController.updateCategory",
      """
        function() {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "admin/updateCategory"})
        }
      """
    )
  
    // @LINE:28
    def deleteCategory: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.CategoryController.deleteCategory",
      """
        function() {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "admin/deleteCategory"})
        }
      """
    )
  
    // @LINE:30
    def getCategories: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.CategoryController.getCategories",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "admin/getCategories"})
        }
      """
    )
  
    // @LINE:26
    def insertCategory: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.CategoryController.insertCategory",
      """
        function() {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "admin/insertCategory"})
        }
      """
    )
  
    // @LINE:29
    def getCategory: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.CategoryController.getCategory",
      """
        function(n0) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "admin/getCategory/" + (""" + implicitly[PathBindable[String]].javascriptUnbind + """)("n", encodeURIComponent(n0))})
        }
      """
    )
  
  }

  // @LINE:20
  class ReverseQuestionOptionController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:23
    def getQuestionOptions: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.QuestionOptionController.getQuestionOptions",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "admin/getQuestionOptions"})
        }
      """
    )
  
    // @LINE:20
    def insertQuestionOption: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.QuestionOptionController.insertQuestionOption",
      """
        function() {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "admin/insertQuestionOption"})
        }
      """
    )
  
    // @LINE:22
    def deleteQuestionOption: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.QuestionOptionController.deleteQuestionOption",
      """
        function() {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "admin/deleteQuestionOption"})
        }
      """
    )
  
    // @LINE:21
    def updateQuestionOption: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.QuestionOptionController.updateQuestionOption",
      """
        function() {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "admin/updateQuestionOption"})
        }
      """
    )
  
  }

  // @LINE:14
  class ReverseQuestionController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:18
    def getQuestions: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.QuestionController.getQuestions",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "admin/getQuestions"})
        }
      """
    )
  
    // @LINE:16
    def deleteQuestion: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.QuestionController.deleteQuestion",
      """
        function() {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "admin/deleteQuestion"})
        }
      """
    )
  
    // @LINE:17
    def getQuestionById: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.QuestionController.getQuestionById",
      """
        function(n0) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "admin/getQuestion/" + (""" + implicitly[PathBindable[String]].javascriptUnbind + """)("n", encodeURIComponent(n0))})
        }
      """
    )
  
    // @LINE:14
    def insertQuestion: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.QuestionController.insertQuestion",
      """
        function() {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "admin/insertQuestion"})
        }
      """
    )
  
    // @LINE:15
    def updateQuestion: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.QuestionController.updateQuestion",
      """
        function() {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "admin/updateQuestion"})
        }
      """
    )
  
  }

  // @LINE:6
  class ReverseParticipantController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:12
    def getParticipants: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.ParticipantController.getParticipants",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "admin/getParticipants"})
        }
      """
    )
  
    // @LINE:11
    def getParticipantswithPage: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.ParticipantController.getParticipantswithPage",
      """
        function(n0) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "admin/getParticipants/" + (""" + implicitly[PathBindable[String]].javascriptUnbind + """)("n", encodeURIComponent(n0))})
        }
      """
    )
  
    // @LINE:10
    def deleteParticipant: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.ParticipantController.deleteParticipant",
      """
        function() {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "admin/deleteParticipant"})
        }
      """
    )
  
    // @LINE:9
    def updateParticipant: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.ParticipantController.updateParticipant",
      """
        function() {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "updateParticipant"})
        }
      """
    )
  
    // @LINE:8
    def insertParticipant: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.ParticipantController.insertParticipant",
      """
        function() {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "insertParticipant"})
        }
      """
    )
  
    // @LINE:6
    def index: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.ParticipantController.index",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + """"})
        }
      """
    )
  
  }


}
