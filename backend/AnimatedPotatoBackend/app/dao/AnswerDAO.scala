package dao

import core.BaseDAO
import models.Answer
import table.AnswerTable
import scala.slick.lifted.TableQuery

class AnswerDAO extends BaseDAO[AnswerTable, Answer](TableQuery[AnswerTable]) {}