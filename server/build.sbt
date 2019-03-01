name := """server"""
organization := "sqshee"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.12.8"

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "4.0.1" % Test
libraryDependencies +=  "org.twitter4j" % "twitter4j-core" % "[4.0,)"

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "sqshee.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "sqshee.binders._"
