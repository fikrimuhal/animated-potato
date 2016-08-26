case class Point (x: Double,y:Double){
  override def toString: String = s"$x $y"


}

val a : List[Point] = List(Point(1,3), Point(1,4))

a mkString ", "
