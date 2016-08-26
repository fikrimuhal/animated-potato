package controllers

import play.api._
import play.api.mvc._
import views._

case class Box (x:Int, y: Int)

class Application extends Controller {
  def index = Action { implicit request =>
    Ok(views.html.report4())
  }
}