package controllers

import models.{Sets, Set}
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import utils.Formatter._

/**
  * Created by who on 09.08.2016.
  */
class SetController extends Controller {

  def insertSet() = Action { implicit request =>

    request.body.asJson.flatMap(_.validate[Set].asOpt) match {

      case Some(set) if Sets.insert(set) =>
        Ok("1")

      case Some(_) =>
        Ok("0")

      case None =>
        Ok("-1")
    }
  }

  def updateSet() = Action { implicit request =>
    try {
      val set: Set = request.body.asJson.get.as[Set]
      if (Sets.update(set)) Ok("1") else BadRequest("-1")
    }
    catch {
      case e: Exception => BadRequest("-1")
    }
  }

  def deleteSet() = Action { implicit request =>
    try {
      val set: Set = request.body.asJson.get.as[Set]
      if (Sets.delete(set)) Ok("1") else BadRequest("-1")
    }
    catch {
      case e: Exception => BadRequest("-1")
    }
  }


  def getSets() = Action {
    try {
      Ok(Json.toJson(Sets.getAllSets()))
    }
    catch {
      case e: Exception => BadRequest("-1")
    }
  }


}
