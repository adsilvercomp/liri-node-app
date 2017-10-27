var keyList = require("./keys.js")
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var file = require('./random.txt');
var fs = require('fs');

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
var omdbArray= [];



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

function movieThis(){
  var movieName=process.argv.splice(3);
  if (movieName.length===0){
    movieName= "Mr. Nobody."
  }
  request(queryURL = "https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece", function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred

    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    
    //console.log('body:', body); // Print the HTML for the Google homepage.

      var info= JSON.parse(body);
      var title=info.Title;
      var year=info.Year;
      var imdbRating= info.imdbRating;
      var rottenTrating= info.Ratings[1];
      var country= info.Country;
      var language= info.Language;
      var plot= info.Plot;
      var actors= info.Actors;

      omdbArray.push({
        title: title,
        year: year,
        imdbRating: imdbRating,
        rottenTrating: rottenTrating,
        country: country,
        language: language,
        plot: plot,
        actors: actors
      })
      console.log(omdbArray);
      
  });
}

function doWhatItSays(){
  spotifyThisSong();
  var readMe = fs.readFileSync('readMe.txt', 'utf8');
  readMe=process.argv;
}

 
// * Title of the movie.---- Title
// * Year the movie came out.---- Year
// * IMDB Rating of the movie. ---- imdbRating
// * Rotten Tomatoes Rating of the movie. Ratings[2]
// * Country where the movie was produced.---Country
// * Language of the movie. ---Language
// * Plot of the movie. ---Plot
// * Actors in the movie. ---Actors








