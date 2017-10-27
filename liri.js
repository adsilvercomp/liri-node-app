var keyList = require("./keys.js")
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var command = process.argv[2];
var tweet
var tweetTime
var tweetArray = [];
var spotifyArray = [];
var artist;
var song;
var songPreview;
var album;
var songSearch;
var query;



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


function spotifyThisSong() {
  // songSearch = process.argv[3];
  songSearch = process.argv.splice(3);
  console.log(songSearch);
  
  if (songSearch.length===0){
    songSearch= "ace of base the sign"
  }

  spotify.search({ type: 'track', query: songSearch, limit: 1 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    

    artist = data.tracks.items[0].artists[0].name;
    song = data.tracks.items[0].name;
    songPreview = data.tracks.items[0].external_urls;
    album = data.tracks.items[0].album.name;
    spotifyArray.push({
      song: song,
      songPreview: songPreview,
      album: album,
      artist: artist
    })
    console.log(spotifyArray);
    console.log(process.argv[3]);
  });
}




