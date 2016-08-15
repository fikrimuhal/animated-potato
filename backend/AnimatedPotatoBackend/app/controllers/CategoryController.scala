package controllers

import models.{Categories, Category}
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import utils.Formatter._

/**
  * Created by who on 09.08.2016.
  */
class CategoryController extends Controller {


  def insertCategory() = Action { implicit request =>
    try {
      val category: Category = request.body.asJson.get.as[Category]
      if (Categories.insert(category)) Ok("1") else BadRequest("-1")
    }
    catch {
      case e: Exception => BadRequest("-1")
    }
  }


  def updateCategory() = Action { implicit request =>
    try {
      val category: Category = request.body.asJson.get.as[Category]
      if (Categories.update(category)) Ok("1") else BadRequest("-1")
    }
    catch {
      case e: Exception => BadRequest("-1")
    }
  }

  def deleteCategory() = Action { implicit request =>
    try {
      val category: Category = request.body.asJson.get.as[Category]
      if (Categories.delete(category)) Ok("1") else BadRequest("-1")
    }
    catch {
      case e: Exception => BadRequest("-1")
    }
  }

  def getCategory(n: String) = Action {
    try {
      val category = Categories.getCategory(n.toInt)
      if (category.id == Some(-1)) BadRequest("-1")
      else Ok(Json.toJson(category))
    }
    catch {
      case e: Exception => BadRequest("-1")
    }
  }

  def getCategories() = Action {
    try {
      Ok(Json.toJson(Categories.getCategories()))
    }
    catch {
      case e: Exception => BadRequest("-1")
    }
  }


}
