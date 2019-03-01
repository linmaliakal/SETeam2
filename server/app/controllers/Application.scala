package controllers

import app.TweetFetcher
import javax.inject.Inject
import play.api.mvc._

class Application @Inject()
(cc: ControllerComponents)
  extends AbstractController(cc) {

  val fetcher: TweetFetcher = new TweetFetcher()
  def topTweets(name: String) = Action {
    Ok(fetcher.calculate(name))
    //Ok("Hello " + name)
  }
}
