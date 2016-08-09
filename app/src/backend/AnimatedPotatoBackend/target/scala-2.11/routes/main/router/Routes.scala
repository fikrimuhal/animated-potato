
// @GENERATOR:play-routes-compiler
// @SOURCE:/home/who/IdeaProjects/animated-potato/AnimatedPotatoBackend/conf/routes
// @DATE:Tue Aug 09 13:47:09 EEST 2016

package router

import play.core.routing._
import play.core.routing.HandlerInvokerFactory._
import play.core.j._

import play.api.mvc._

import _root_.controllers.Assets.Asset

class Routes(
  override val errorHandler: play.api.http.HttpErrorHandler, 
  // @LINE:6
  ParticipantController_3: controllers.ParticipantController,
  // @LINE:14
  QuestionController_0: controllers.QuestionController,
  // @LINE:20
  QuestionOptionController_1: controllers.QuestionOptionController,
  // @LINE:26
  CategoryController_2: controllers.CategoryController,
  // @LINE:35
  Assets_4: controllers.Assets,
  val prefix: String
) extends GeneratedRouter {

   @javax.inject.Inject()
   def this(errorHandler: play.api.http.HttpErrorHandler,
    // @LINE:6
    ParticipantController_3: controllers.ParticipantController,
    // @LINE:14
    QuestionController_0: controllers.QuestionController,
    // @LINE:20
    QuestionOptionController_1: controllers.QuestionOptionController,
    // @LINE:26
    CategoryController_2: controllers.CategoryController,
    // @LINE:35
    Assets_4: controllers.Assets
  ) = this(errorHandler, ParticipantController_3, QuestionController_0, QuestionOptionController_1, CategoryController_2, Assets_4, "/")

  import ReverseRouteContext.empty

  def withPrefix(prefix: String): Routes = {
    router.RoutesPrefix.setPrefix(prefix)
    new Routes(errorHandler, ParticipantController_3, QuestionController_0, QuestionOptionController_1, CategoryController_2, Assets_4, prefix)
  }

  private[this] val defaultPrefix: String = {
    if (this.prefix.endsWith("/")) "" else "/"
  }

  def documentation = List(
    ("""GET""", this.prefix, """controllers.ParticipantController.index"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """insertParticipant""", """controllers.ParticipantController.insertParticipant"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """updateParticipant""", """controllers.ParticipantController.updateParticipant"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """admin/deleteParticipant""", """controllers.ParticipantController.deleteParticipant"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """admin/getParticipants/""" + "$" + """n<[^/]+>""", """controllers.ParticipantController.getParticipantswithPage(n:String)"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """admin/getParticipants""", """controllers.ParticipantController.getParticipants()"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """admin/insertQuestion""", """controllers.QuestionController.insertQuestion"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """admin/updateQuestion""", """controllers.QuestionController.updateQuestion"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """admin/deleteQuestion""", """controllers.QuestionController.deleteQuestion"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """admin/getQuestion/""" + "$" + """n<[^/]+>""", """controllers.QuestionController.getQuestionById(n:String)"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """admin/getQuestions""", """controllers.QuestionController.getQuestions"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """admin/insertQuestionOption""", """controllers.QuestionOptionController.insertQuestionOption"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """admin/updateQuestionOption""", """controllers.QuestionOptionController.updateQuestionOption"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """admin/deleteQuestionOption""", """controllers.QuestionOptionController.deleteQuestionOption"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """admin/getQuestionOptions""", """controllers.QuestionOptionController.getQuestionOptions"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """admin/insertCategory""", """controllers.CategoryController.insertCategory"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """admin/updateCategory""", """controllers.CategoryController.updateCategory"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """admin/deleteCategory""", """controllers.CategoryController.deleteCategory"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """admin/getCategory/""" + "$" + """n<[^/]+>""", """controllers.CategoryController.getCategory(n:String)"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """admin/getCategories""", """controllers.CategoryController.getCategories"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """assets/""" + "$" + """file<.+>""", """controllers.Assets.at(path:String = "/public", file:String)"""),
    Nil
  ).foldLeft(List.empty[(String,String,String)]) { (s,e) => e.asInstanceOf[Any] match {
    case r @ (_,_,_) => s :+ r.asInstanceOf[(String,String,String)]
    case l => s ++ l.asInstanceOf[List[(String,String,String)]]
  }}


  // @LINE:6
  private[this] lazy val controllers_ParticipantController_index0_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix)))
  )
  private[this] lazy val controllers_ParticipantController_index0_invoker = createInvoker(
    ParticipantController_3.index,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.ParticipantController",
      "index",
      Nil,
      "GET",
      """ Home page""",
      this.prefix + """"""
    )
  )

  // @LINE:8
  private[this] lazy val controllers_ParticipantController_insertParticipant1_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("insertParticipant")))
  )
  private[this] lazy val controllers_ParticipantController_insertParticipant1_invoker = createInvoker(
    ParticipantController_3.insertParticipant,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.ParticipantController",
      "insertParticipant",
      Nil,
      "POST",
      """""",
      this.prefix + """insertParticipant"""
    )
  )

  // @LINE:9
  private[this] lazy val controllers_ParticipantController_updateParticipant2_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("updateParticipant")))
  )
  private[this] lazy val controllers_ParticipantController_updateParticipant2_invoker = createInvoker(
    ParticipantController_3.updateParticipant,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.ParticipantController",
      "updateParticipant",
      Nil,
      "POST",
      """""",
      this.prefix + """updateParticipant"""
    )
  )

  // @LINE:10
  private[this] lazy val controllers_ParticipantController_deleteParticipant3_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("admin/deleteParticipant")))
  )
  private[this] lazy val controllers_ParticipantController_deleteParticipant3_invoker = createInvoker(
    ParticipantController_3.deleteParticipant,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.ParticipantController",
      "deleteParticipant",
      Nil,
      "POST",
      """""",
      this.prefix + """admin/deleteParticipant"""
    )
  )

  // @LINE:11
  private[this] lazy val controllers_ParticipantController_getParticipantswithPage4_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("admin/getParticipants/"), DynamicPart("n", """[^/]+""",true)))
  )
  private[this] lazy val controllers_ParticipantController_getParticipantswithPage4_invoker = createInvoker(
    ParticipantController_3.getParticipantswithPage(fakeValue[String]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.ParticipantController",
      "getParticipantswithPage",
      Seq(classOf[String]),
      "GET",
      """""",
      this.prefix + """admin/getParticipants/""" + "$" + """n<[^/]+>"""
    )
  )

  // @LINE:12
  private[this] lazy val controllers_ParticipantController_getParticipants5_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("admin/getParticipants")))
  )
  private[this] lazy val controllers_ParticipantController_getParticipants5_invoker = createInvoker(
    ParticipantController_3.getParticipants(),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.ParticipantController",
      "getParticipants",
      Nil,
      "GET",
      """""",
      this.prefix + """admin/getParticipants"""
    )
  )

  // @LINE:14
  private[this] lazy val controllers_QuestionController_insertQuestion6_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("admin/insertQuestion")))
  )
  private[this] lazy val controllers_QuestionController_insertQuestion6_invoker = createInvoker(
    QuestionController_0.insertQuestion,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.QuestionController",
      "insertQuestion",
      Nil,
      "POST",
      """""",
      this.prefix + """admin/insertQuestion"""
    )
  )

  // @LINE:15
  private[this] lazy val controllers_QuestionController_updateQuestion7_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("admin/updateQuestion")))
  )
  private[this] lazy val controllers_QuestionController_updateQuestion7_invoker = createInvoker(
    QuestionController_0.updateQuestion,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.QuestionController",
      "updateQuestion",
      Nil,
      "POST",
      """""",
      this.prefix + """admin/updateQuestion"""
    )
  )

  // @LINE:16
  private[this] lazy val controllers_QuestionController_deleteQuestion8_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("admin/deleteQuestion")))
  )
  private[this] lazy val controllers_QuestionController_deleteQuestion8_invoker = createInvoker(
    QuestionController_0.deleteQuestion,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.QuestionController",
      "deleteQuestion",
      Nil,
      "POST",
      """""",
      this.prefix + """admin/deleteQuestion"""
    )
  )

  // @LINE:17
  private[this] lazy val controllers_QuestionController_getQuestionById9_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("admin/getQuestion/"), DynamicPart("n", """[^/]+""",true)))
  )
  private[this] lazy val controllers_QuestionController_getQuestionById9_invoker = createInvoker(
    QuestionController_0.getQuestionById(fakeValue[String]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.QuestionController",
      "getQuestionById",
      Seq(classOf[String]),
      "GET",
      """""",
      this.prefix + """admin/getQuestion/""" + "$" + """n<[^/]+>"""
    )
  )

  // @LINE:18
  private[this] lazy val controllers_QuestionController_getQuestions10_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("admin/getQuestions")))
  )
  private[this] lazy val controllers_QuestionController_getQuestions10_invoker = createInvoker(
    QuestionController_0.getQuestions,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.QuestionController",
      "getQuestions",
      Nil,
      "GET",
      """""",
      this.prefix + """admin/getQuestions"""
    )
  )

  // @LINE:20
  private[this] lazy val controllers_QuestionOptionController_insertQuestionOption11_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("admin/insertQuestionOption")))
  )
  private[this] lazy val controllers_QuestionOptionController_insertQuestionOption11_invoker = createInvoker(
    QuestionOptionController_1.insertQuestionOption,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.QuestionOptionController",
      "insertQuestionOption",
      Nil,
      "POST",
      """""",
      this.prefix + """admin/insertQuestionOption"""
    )
  )

  // @LINE:21
  private[this] lazy val controllers_QuestionOptionController_updateQuestionOption12_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("admin/updateQuestionOption")))
  )
  private[this] lazy val controllers_QuestionOptionController_updateQuestionOption12_invoker = createInvoker(
    QuestionOptionController_1.updateQuestionOption,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.QuestionOptionController",
      "updateQuestionOption",
      Nil,
      "POST",
      """""",
      this.prefix + """admin/updateQuestionOption"""
    )
  )

  // @LINE:22
  private[this] lazy val controllers_QuestionOptionController_deleteQuestionOption13_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("admin/deleteQuestionOption")))
  )
  private[this] lazy val controllers_QuestionOptionController_deleteQuestionOption13_invoker = createInvoker(
    QuestionOptionController_1.deleteQuestionOption,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.QuestionOptionController",
      "deleteQuestionOption",
      Nil,
      "POST",
      """""",
      this.prefix + """admin/deleteQuestionOption"""
    )
  )

  // @LINE:23
  private[this] lazy val controllers_QuestionOptionController_getQuestionOptions14_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("admin/getQuestionOptions")))
  )
  private[this] lazy val controllers_QuestionOptionController_getQuestionOptions14_invoker = createInvoker(
    QuestionOptionController_1.getQuestionOptions,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.QuestionOptionController",
      "getQuestionOptions",
      Nil,
      "GET",
      """""",
      this.prefix + """admin/getQuestionOptions"""
    )
  )

  // @LINE:26
  private[this] lazy val controllers_CategoryController_insertCategory15_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("admin/insertCategory")))
  )
  private[this] lazy val controllers_CategoryController_insertCategory15_invoker = createInvoker(
    CategoryController_2.insertCategory,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.CategoryController",
      "insertCategory",
      Nil,
      "POST",
      """""",
      this.prefix + """admin/insertCategory"""
    )
  )

  // @LINE:27
  private[this] lazy val controllers_CategoryController_updateCategory16_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("admin/updateCategory")))
  )
  private[this] lazy val controllers_CategoryController_updateCategory16_invoker = createInvoker(
    CategoryController_2.updateCategory,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.CategoryController",
      "updateCategory",
      Nil,
      "POST",
      """""",
      this.prefix + """admin/updateCategory"""
    )
  )

  // @LINE:28
  private[this] lazy val controllers_CategoryController_deleteCategory17_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("admin/deleteCategory")))
  )
  private[this] lazy val controllers_CategoryController_deleteCategory17_invoker = createInvoker(
    CategoryController_2.deleteCategory,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.CategoryController",
      "deleteCategory",
      Nil,
      "POST",
      """""",
      this.prefix + """admin/deleteCategory"""
    )
  )

  // @LINE:29
  private[this] lazy val controllers_CategoryController_getCategory18_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("admin/getCategory/"), DynamicPart("n", """[^/]+""",true)))
  )
  private[this] lazy val controllers_CategoryController_getCategory18_invoker = createInvoker(
    CategoryController_2.getCategory(fakeValue[String]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.CategoryController",
      "getCategory",
      Seq(classOf[String]),
      "GET",
      """""",
      this.prefix + """admin/getCategory/""" + "$" + """n<[^/]+>"""
    )
  )

  // @LINE:30
  private[this] lazy val controllers_CategoryController_getCategories19_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("admin/getCategories")))
  )
  private[this] lazy val controllers_CategoryController_getCategories19_invoker = createInvoker(
    CategoryController_2.getCategories,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.CategoryController",
      "getCategories",
      Nil,
      "GET",
      """""",
      this.prefix + """admin/getCategories"""
    )
  )

  // @LINE:35
  private[this] lazy val controllers_Assets_at20_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("assets/"), DynamicPart("file", """.+""",false)))
  )
  private[this] lazy val controllers_Assets_at20_invoker = createInvoker(
    Assets_4.at(fakeValue[String], fakeValue[String]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.Assets",
      "at",
      Seq(classOf[String], classOf[String]),
      "GET",
      """ Map static resources from the /public folder to the /assets URL path""",
      this.prefix + """assets/""" + "$" + """file<.+>"""
    )
  )


  def routes: PartialFunction[RequestHeader, Handler] = {
  
    // @LINE:6
    case controllers_ParticipantController_index0_route(params) =>
      call { 
        controllers_ParticipantController_index0_invoker.call(ParticipantController_3.index)
      }
  
    // @LINE:8
    case controllers_ParticipantController_insertParticipant1_route(params) =>
      call { 
        controllers_ParticipantController_insertParticipant1_invoker.call(ParticipantController_3.insertParticipant)
      }
  
    // @LINE:9
    case controllers_ParticipantController_updateParticipant2_route(params) =>
      call { 
        controllers_ParticipantController_updateParticipant2_invoker.call(ParticipantController_3.updateParticipant)
      }
  
    // @LINE:10
    case controllers_ParticipantController_deleteParticipant3_route(params) =>
      call { 
        controllers_ParticipantController_deleteParticipant3_invoker.call(ParticipantController_3.deleteParticipant)
      }
  
    // @LINE:11
    case controllers_ParticipantController_getParticipantswithPage4_route(params) =>
      call(params.fromPath[String]("n", None)) { (n) =>
        controllers_ParticipantController_getParticipantswithPage4_invoker.call(ParticipantController_3.getParticipantswithPage(n))
      }
  
    // @LINE:12
    case controllers_ParticipantController_getParticipants5_route(params) =>
      call { 
        controllers_ParticipantController_getParticipants5_invoker.call(ParticipantController_3.getParticipants())
      }
  
    // @LINE:14
    case controllers_QuestionController_insertQuestion6_route(params) =>
      call { 
        controllers_QuestionController_insertQuestion6_invoker.call(QuestionController_0.insertQuestion)
      }
  
    // @LINE:15
    case controllers_QuestionController_updateQuestion7_route(params) =>
      call { 
        controllers_QuestionController_updateQuestion7_invoker.call(QuestionController_0.updateQuestion)
      }
  
    // @LINE:16
    case controllers_QuestionController_deleteQuestion8_route(params) =>
      call { 
        controllers_QuestionController_deleteQuestion8_invoker.call(QuestionController_0.deleteQuestion)
      }
  
    // @LINE:17
    case controllers_QuestionController_getQuestionById9_route(params) =>
      call(params.fromPath[String]("n", None)) { (n) =>
        controllers_QuestionController_getQuestionById9_invoker.call(QuestionController_0.getQuestionById(n))
      }
  
    // @LINE:18
    case controllers_QuestionController_getQuestions10_route(params) =>
      call { 
        controllers_QuestionController_getQuestions10_invoker.call(QuestionController_0.getQuestions)
      }
  
    // @LINE:20
    case controllers_QuestionOptionController_insertQuestionOption11_route(params) =>
      call { 
        controllers_QuestionOptionController_insertQuestionOption11_invoker.call(QuestionOptionController_1.insertQuestionOption)
      }
  
    // @LINE:21
    case controllers_QuestionOptionController_updateQuestionOption12_route(params) =>
      call { 
        controllers_QuestionOptionController_updateQuestionOption12_invoker.call(QuestionOptionController_1.updateQuestionOption)
      }
  
    // @LINE:22
    case controllers_QuestionOptionController_deleteQuestionOption13_route(params) =>
      call { 
        controllers_QuestionOptionController_deleteQuestionOption13_invoker.call(QuestionOptionController_1.deleteQuestionOption)
      }
  
    // @LINE:23
    case controllers_QuestionOptionController_getQuestionOptions14_route(params) =>
      call { 
        controllers_QuestionOptionController_getQuestionOptions14_invoker.call(QuestionOptionController_1.getQuestionOptions)
      }
  
    // @LINE:26
    case controllers_CategoryController_insertCategory15_route(params) =>
      call { 
        controllers_CategoryController_insertCategory15_invoker.call(CategoryController_2.insertCategory)
      }
  
    // @LINE:27
    case controllers_CategoryController_updateCategory16_route(params) =>
      call { 
        controllers_CategoryController_updateCategory16_invoker.call(CategoryController_2.updateCategory)
      }
  
    // @LINE:28
    case controllers_CategoryController_deleteCategory17_route(params) =>
      call { 
        controllers_CategoryController_deleteCategory17_invoker.call(CategoryController_2.deleteCategory)
      }
  
    // @LINE:29
    case controllers_CategoryController_getCategory18_route(params) =>
      call(params.fromPath[String]("n", None)) { (n) =>
        controllers_CategoryController_getCategory18_invoker.call(CategoryController_2.getCategory(n))
      }
  
    // @LINE:30
    case controllers_CategoryController_getCategories19_route(params) =>
      call { 
        controllers_CategoryController_getCategories19_invoker.call(CategoryController_2.getCategories)
      }
  
    // @LINE:35
    case controllers_Assets_at20_route(params) =>
      call(Param[String]("path", Right("/public")), params.fromPath[String]("file", None)) { (path, file) =>
        controllers_Assets_at20_invoker.call(Assets_4.at(path, file))
      }
  }
}
