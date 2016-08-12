val a =1


val b = List((1->1.4),(2->2.3))

val c = b mkString ","
val asd = "(1,2),(3,4)"



val result = c.split(", ").map(_ split ",") collect { case Array(k, v) => (k, v) } toMap