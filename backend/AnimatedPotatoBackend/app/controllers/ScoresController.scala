package controllers

//import com.paulgoldbaum.influxdbclient._
import core.Jwt
import models.ScoresDAO
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import utils.{Constants, ID, ResponseMessage}
import utils.Formatter._

class ScoresController extends Controller with Jwt{

  def getAll = Action {

    Ok(Json.toJson(ScoresDAO.getAll))

  }

  def getComparativeReport = Admin { implicit request =>

    request.body.asJson.flatMap(_.validate[ID].asOpt) match {

      case Some(id) =>
        Ok(Json.toJson(ScoresDAO.getComparativeReport(id.id)))

      case _ =>
        BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))
    }
  }

  def getUsersResults = Admin { implicit request =>
    request.body.asJson.flatMap(_.validate[ID].asOpt) match {

      case Some(id) =>
        Ok(Json.toJson(ScoresDAO.getUsersResults(id.id)))

      case _ =>
        BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))
    }

  }


  def getCategoryResults = Admin { implicit request =>
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

  def getUserReport = UserAction { implicit request =>

    request.body.asJson.flatMap(_.validate[ID].asOpt) match {

      case Some(id) => Ok(Json.toJson(ScoresDAO.getUserReport(id.id)))

      case _ => BadRequest(Json.toJson(ResponseMessage(Constants.FAIL, Constants.UNEXPECTED_ERROR_MESSAGE)))

    }
  }
}
