package app

import twitter4j.{Query, TwitterFactory, TwitterObjectFactory}
import twitter4j.conf.ConfigurationBuilder

import scala.collection.immutable.Queue
import scala.collection.immutable.Map
import scala.collection.mutable.ListBuffer
import play.api.libs.json.{JsValue, Json, __}

class TweetFetcher {

  // (1) config work to create a twitter object
  val cb = new ConfigurationBuilder()
  cb.setDebugEnabled(true)
    .setOAuthConsumerKey("I0owD3bytKjPsfJjUIn4Op5X1") //These should not be hard-coded
    .setOAuthConsumerSecret("lwvTah4QyOqYsSk6kgJGnsay2l48ZFtnw9w1bPc9il46qv6e2y")
    .setOAuthAccessToken("1097556572098752512-28yMeApFcc01GuisWqTxGMexXMSOGW")
    .setOAuthAccessTokenSecret("RHkOXXzXfzh5zKnXUb5KXiDSfK7y75HNooqmIjHNSJTNm")
  val tf = new TwitterFactory(cb.build())
  val twitter = tf.getInstance()

  def calculate(userSearch: String): JsValue = {
    //val twitterOF = new TwitterObjectFactory()
    //System.out.println()

    // (2) use the twitter object to get your friend's timeline
    val userQuery: Query = new Query(userSearch)
    userQuery.setCount(100)
    userQuery.setLang("en")
    val results = twitter.search().search(userQuery)
    println("Search = " + userSearch)
    println("Showing search results:")
    val stringList = new ListBuffer[String]()
    val it = results.getTweets.iterator()
    while (it.hasNext) {
      val status = it.next()
      stringList.append(status.getText) // println(status.getText) //or status.getUser.getName
    }
    println(stringList.size)
    // word counter
    val finalList = ListBuffer[String]()
    val argList = (10, 6, 1000, 100) // 1) Top n words 2) min word length 3) Slide width 4) Steps per slide
    val words = stringList.iterator.flatMap(_.split("(?U)[^\\p{Alpha}0-9']+"))

    val countMap = words.sliding(argList._3, argList._4).foreach{
      next => next.scanLeft(Queue.empty[String]){
        case (queue, w) => queue.enqueue(w)
      }.drop(argList._3).flatten.scanLeft(Map.empty[String, Int]){
        case (map, word) => map.updated(word, map.getOrElse(word, 0) + 1)
      }.drop(argList._3).flatten.filter((i: (String, Int)) => i._1.length > argList._2).sortWith(_._2 > _._2).take(argList._1).foreach{
        case (word, count) => finalList.append(word) //print(word + ": " + count + " ")
      };}
    println(finalList.size)
    Json.toJson(finalList.distinct)
  }
}
