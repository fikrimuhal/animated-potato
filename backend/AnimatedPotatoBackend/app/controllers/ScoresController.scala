package controllers

//import com.paulgoldbaum.influxdbclient._
import scala.concurrent.ExecutionContext.Implicits.global

import models.{ID, ResponseMessage, Scores, ScoresDAO}
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import utils.Constants
import utils.Formatter._

class ScoresController extends Controller {


  def insert(scores: Scores) = Action { implicit request =>

    request.body.asJson.flatMap(_.validate[Scores].asOpt) match {

      case Some(scores) =>

        if (ScoresDAO.insert(scores)) {
          Ok(Json.toJson(ResponseMessage(Constants.OK, Constants.OK_MESSAGE)))
        }
        else {
          InternalServerError(Json.toJson(ResponseMessage(Constants.FAIL, Constants.SERVER_ERROR_MESSAGE)))
        }

      case _ =>
        BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))
    }
  }

  def getAll = Action {

    Ok(Json.toJson(ScoresDAO.getAll))

  }

  def getComparativeReport = Action { implicit request =>

    request.body.asJson.flatMap(_.validate[ID].asOpt) match {

      case Some(id) =>

        Ok(Json.toJson(ScoresDAO.getComparativeReport(id.id)))


      case _ =>
        BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))
    }
  }

  def getUsersResults = Action { implicit request =>
    request.body.asJson.flatMap(_.validate[ID].asOpt) match {

      case Some(id) =>
        Ok(Json.toJson(ScoresDAO.getUsersResults(id.id)))

      case _ =>
        BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))
    }

  }


  def getCategoryResults = Action { implicit request =>
//
//      val influxdb = InfluxDB.connect("influxdb.ofis.fikrimuhal.com", 8086)
//
//      val database = influxdb.selectDatabase("mulakat_dev")
//
//      database.write(Point(key = "TABLO_ADI", timestamp = System.currentTimeMillis).addField("FIELD_ADI", 786786))

    request.body.asJson.flatMap(_.validate[ID].asOpt) match {

      case Some(id) => Ok(Json.toJson(ScoresDAO.getCategoryResults(id.id)))

      case _ => BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))

    }
  }


}
