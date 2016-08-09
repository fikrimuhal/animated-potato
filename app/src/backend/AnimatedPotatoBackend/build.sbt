name := "AnimatedPotatoBackend"

version := "1.0"

lazy val `animatedpotatobackend` = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.7"

libraryDependencies ++= Seq( jdbc , cache , ws   , specs2 % Test )

libraryDependencies ++= Seq(
  "com.typesafe.slick" %% "slick"      % "2.1.0",
  "org.postgresql"     %  "postgresql" % "9.3-1102-jdbc41")

unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test" )  

resolvers += "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases"  