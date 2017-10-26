var keyList = require("./keys.js")
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var command = process.argv[2];
var tweet
var tweetTime
var tweetArray = [];
var spotifyArray = [];
var userInput= process.argv[2];
var artist;
var song;
var songPreview;
var album;


var client = new Twitter({
  consumer_key: keyList.twitterKeys.consumer_key,
  consumer_secret: keyList.twitterKeys.consumer_secret,
  access_token_key: keyList.twitterKeys.access_token_key,
  access_token_secret: keyList.twitterKeys.access_token_secret
});

//twitter info
var params = {
  screen_name: '@silversteinmah1',
  count: 20
};

//spotify info
var spotify = new Spotify({
 id: "48dc457b4e2a451f9cac0903695fd6f2",
 secret: "579f6b8858d243aaac3490d68534e0fe"
});


switch (command) {
  case "my-tweets":
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

//my tweets function makes call to twitter api for tweets and console logs them.
function myTweets() {
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {

      for (var x = 0; x < 20; x++) {
        tweet = tweets[x].text;
        tweetTime = tweets[x].created_at;
        tweetArray.push({
          tweet: tweet,
          tweetTime: tweetTime
        })

      }

      console.log('AFTER FOR LOOP');
      console.log(tweetArray);

    }

    console.log(JSON.stringify(error));
  });
}



//This is the spotify api call


function spotifyThisSong(){
spotify.search({ type: 'track', query: "thriller", limit: 1 }, function(err, data) {
 if (err) {
   return console.log('Error occurred: ' + err);
 }
  // console.log("artist name");
  //  console.log(data.tracks.items[0].artists);

  //  console.log("song name:");
  //  console.log(data.tracks.items[0].name);

  //  console.log("preview link of song:")
  //  console.log(data.tracks.items[0].external_urls);

  //  console.log("album name:")
  //  console.log(data.tracks.items[0].album.name);

  artist= data.tracks.items[0].artists;
  song= data.tracks.items[0].name;
  songPreview= data.tracks.items[0].external_urls;
  album= data.tracks.items[0].album.name;
  spotifyArray.push({
    song: song,
    songPreview: songPreview,
    album: album,
    artist: artist
  })
  console.log(spotifyArray);
});

}




// Spotify 
// Client ID:
// 48dc457b4e2a451f9cac0903695fd6f2
// Client Secret:
// 579f6b8858d243aaac3490d68534e0fe









