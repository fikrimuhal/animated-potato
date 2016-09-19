name :="interviewService"

version :="1.0-SNAPSHOT"

organization in ThisBuild := "com.fikrimuhal.animatedPotato"

scalaVersion := "2.11.8"
lazy val protocol = ProjectRef(id = "protocol", base = file("../protocol"))

lazy val interviewService = project in file(".") aggregate(protocol) dependsOn(protocol)


libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-cluster-metrics" % akkaVersion,
  // Akka
  "com.typesafe.akka" %% "akka-actor" % akkaVersion,
  "com.typesafe.akka" %% "akka-cluster" % akkaVersion,
  "com.typesafe.akka" %% "akka-contrib" % akkaVersion
)

lazy val akkaVersion = "2.4.2"
