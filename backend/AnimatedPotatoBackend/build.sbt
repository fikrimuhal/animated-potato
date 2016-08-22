name := "backend"

version := "1.0-SNAPSHOT"

organization in ThisBuild := "com.fikrimuhal.animatedPotato"

scalaVersion := "2.11.8"

lazy val protocol = ProjectRef(id = "protocol", base = file("../protocol"))

lazy val interviewService = ProjectRef(id = "interviewService", base = file("../interviewservice"))

lazy val root = project in file(".") enablePlugins(PlayScala) aggregate(protocol,interviewService) dependsOn(protocol,interviewService)

libraryDependencies ++= Seq( jdbc , cache , ws, specs2 % Test,filters )

libraryDependencies ++= Seq(
  "com.typesafe.slick" %% "slick"      % "2.1.0",
  "org.postgresql"     %  "postgresql" % "9.3-1102-jdbc41",
  "com.pauldijou" %% "jwt-play" % "0.8.0",
  "com.github.t3hnar" %% "scala-bcrypt" % "2.6")

unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test" )  

resolvers += "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases"

packageName in Universal := "backend"


javaOptions in Universal ++= Seq(
  // remove the PID file
  s"-Dpidfile.path=/dev/null"
)