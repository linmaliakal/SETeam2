# SETeam2
Continuation of the Twitter Messaging Engine with new features and a better user interface and experience! <br/>
## Product Scope
This web application was developed in the scope of deciphering the components of a tweet based on the specifications outlined on Twitter. It was also developed to have provide the user with an increased amount of interactive options.
## How to Use
In the application, we implemented a tweet parser where users can visually interact with tweets. <br/>
To use the web app, users first navigate to either an existing tweet look-up or a manual entry page. <br/>
In the look-up page, users can enter a search term that returns the most recent tweets including that search term, and provides the first word of the tweet with the highest frequency of the search term as an interactive object. Within our project, we had trouble properly integrating the back end look-up which was written in scala with the front end, so we wired the web app to return results for the search term "hello."<br/>
In the manual entry page, users can enter tweets that they wish to interact with in the canvas area by entering the tweet in the above text area, and then clicking the "Add to Jello!" button to turn the text into a moveable object in the canvas.
## References
* [Bounce - CSS](http://bouncejs.com/) <br/>
* [Bouncing Jelly](https://codepen.io/dissimulate/pen/dJgMaO) <br/>
* [Twitter APIs](https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/overview.html)  <br/>
* [More Misc. CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations) <br/>
* [PhysicsJS API](http://wellcaffeinated.net/PhysicsJS/docs/) <br/>
* [Color Schemes](https://coolors.co/220c10-506c64-77cbb9-75b8c8-cdd3d5) <br/>
* [Bridge Pattern](https://www.geeksforgeeks.org/bridge-design-pattern/) <br/>
* [Font Selection](https://inkbotdesign.com/font-combinations/)<br/>

## Operating Environment
This web application makes use of Twitter's searching API and a Physics API for gravity implementation. On the back-end, Scala is being used to obtain past tweet information. We created a developer Twitter account to aide in the process of using the API. The testing for JavaScript can be found in the spec folder, done through Jasmine. <br/>
## Design Pattern
We determined and decided to use the Bridge Pattern in order to make use of the Scala language and work done by one group and the JavaScript of the other. By using the Bridge pattern, we were able to develop separately in terms of the abstraction and actual implementation onto the site of returning tweet information on the canvas.
## Requirements
see [Criteria](https://docs.google.com/document/d/1KlwAab5cUWVIutLbwN3RszApHJZq2cN6fz6Z1zN5fsQ/edit)
