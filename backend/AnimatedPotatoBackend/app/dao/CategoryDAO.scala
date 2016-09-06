package dao

import core.BaseDAO
import models.Category
import table.CategoryTable
import scala.slick.lifted.TableQuery

class CategoryDAO extends BaseDAO[CategoryTable, Category](TableQuery[CategoryTable]) {}