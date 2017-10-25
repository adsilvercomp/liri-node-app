var keyList = require("./keys.js")
var Twitter = require('twitter');
var command = process.argv[2];
var tweet
var tweetTime
var tweetArray = [];

var client = new Twitter({
 consumer_key: keyList.twitterKeys.consumer_key,
 consumer_secret: keyList.twitterKeys.consumer_secret,
 access_token_key: keyList.twitterKeys.access_token_key,
 access_token_secret: keyList.twitterKeys.access_token_secret
});

var params = {
  screen_name: '@silversteinmah1',
  count: 20
};


switch (command) {
  case "my-tweets":
    console.log("hai")
    myTweets();
    break;

  case "spotify-this-song":
    spotifyThisSong();
    break;

  case "movie-this":
    movieThis();
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;

    //look up switch case default block- you have to add it incase none of the cases work.
}



client.get('statuses/user_timeline', params, function(error, tweets, response) {
 if (!error) {

  for(var x=0;x<20;x++){
     tweet= tweets[x].text;
     tweetTime=tweets[x].created_at;
     tweetArray.push({
      tweet:tweet,
      tweetTime:tweetTime
     })
     
  }
 console.log('AFTER FOR LOOP');
  console.log(tweetArray);
  //console.log(tweets);
  //console.log(response);
  // console.log(error);
 }
 
 
 console.log(JSON.stringify(error));
});

function myTweets(){
  console.log("hello");
  tweetArray;
}





