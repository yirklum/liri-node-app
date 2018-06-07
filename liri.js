require("dotenv").config();


// Import keys
var keys = require("./keys.js");

// Import node modules
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var fs = require("fs");


// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

// Take in command line input
var userInput = "";
var nodeArgs = process.argv;
    for (var i = 2; i < nodeArgs.length; i++) {
        userInput = nodeArgs[i];
        console.log(userInput);
    }



// Create myTweets function
// Show your last 20 tweets and when they were created at in terminal/back window

function myTweets() {

    var client = new twitter(keys.twitter);
 
    var params = {screen_name: 'crusty411', count: 20};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                var tweetText = tweets[i].text;
                var tweetDate = tweets[i].created_at;
                console.log("-------------------------------------------");
                console.log("Tweet: " + tweetText);
                console.log("Date: " + tweetDate);
            }   
        }    
    });
}

if (userInput == "my-tweets") {
    myTweets();
}

  // We use JSON.stringify to print the data in string format.
  // We use the JSON.stringify argument of "2" to make the format pretty.
  // See link here: http://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript
//   console.log(JSON.stringify(result, null, 2));


// Create spotifyThisSong function
// Show song information (artist, song name, a preview link of the song from Spotify and the album in 
// the terminal/bash window)
// If no song is provided, program will default to "The Sign" by Ace of Base
// Use node-spotify-api to retrieve song information
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify(keys.spotify);
    
function spotifyThisSong() {
    if (songName == undefined) {
        search = "The Sign Ace of Base";
    } else {
        search = songName;
    }

    spotify.search({ type: 'track', query: search, limit: 1 }, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
        }            
            var song = data.tracks.items[0];
            
            var artist = song.artists[0].name;
            var name = song.name;
            var preview = song.preview_url;
            var album = song.album.name;
            
            console.log("*******************************************");
            console.log("Artist: " + artist);
            console.log("-------------------------------------------");
            console.log("Song Name: " + name);
            console.log("-------------------------------------------");
            console.log("Preview URL: " + preview);
            console.log("-------------------------------------------");
            console.log("Album: " + album);
            console.log("*******************************************");
    });
}

//     if (process.argv[2] == "spotify-this-song") {
//     spotifyThisSong();
// }

// Create movieThis function
// Output information about a movie (title, year released, IMDB rating, Rotten Tomatoes rating, country it was
// produced in, language, plot of movie, and actors)
// If user doesn't type a movie, the program should output data from "Mr. Nobody"
// Use OMDB API to retrieve movie information

    
function movieThis() {
        if (movieName == undefined) {
        search = "Mr. Nobody";
        }   else {
        search = movieName;
        }
    var queryURL = "http://www.omdbapi.com/?t=" + search + "&y=&plot=full&tomatoes=true&apikey=trilogy";
    
    // console.log(queryURL);

    request(queryURL, function(error, response, body) {
    
        if (!error && response.statusCode === 200) {
        
        console.log("*******************************************");
        console.log("Title: " + JSON.parse(body).Title);
        console.log("-------------------------------------------");
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("-------------------------------------------");
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("-------------------------------------------");
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
        console.log("-------------------------------------------");
        console.log("Country Where Produced: " + JSON.parse(body).Country);
        console.log("-------------------------------------------");
        console.log("Language: " + JSON.parse(body).Language);
        console.log("-------------------------------------------");
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("-------------------------------------------");
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("*******************************************");
        }
    });
}

// if (process.argv[2] == "movie-this") {
//     spotifyThisSong();
// }


// // Include the request npm package (Don't forget to run "npm install request" in this folder first!)
// var request = require("request");

// // Then run a request to the OMDB API with the movie specified
// request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

//   // If the request is successful (i.e. if the response status code is 200)
//   if (!error && response.statusCode === 200) {

//     // Parse the body of the site and recover just the imdbRating
//     // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//     console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
//   }
// });


// // Include the request npm package (Don't forget to run "npm install request" in this folder first!)
// var request = require("request");

// // Store all of the arguments in an array
// var nodeArgs = process.argv;

// // Create an empty variable for holding the movie name
// var movieName = "";

// // Loop through all the words in the node argument
// // And do a little for-loop magic to handle the inclusion of "+"s
// for (var i = 2; i < nodeArgs.length; i++) {

//   if (i > 2 && i < nodeArgs.length) {

//     movieName = movieName + "+" + nodeArgs[i];

//   }

//   else {

//     movieName += nodeArgs[i];

//   }
// }

// // Then run a request to the OMDB API with the movie specified
// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// // This line is just to help us debug against the actual URL.
// console.log(queryUrl);

// request(queryUrl, function(error, response, body) {

//   // If the request is successful
//   if (!error && response.statusCode === 200) {

//     // Parse the body of the site and recover just the imdbRating
//     // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//     console.log("Release Year: " + JSON.parse(body).Year);
//   }
// });



// Create doWhatItSays function
// Use fs Node package to take the text inside random.text and use it to call one of LIRI's commands
// It should run spotify-this-song for "I Want it That Way" as follows the text in RandomSource.txt


function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var randomArray = data.split(",");
        console.log(randomArray[1]);
        songName = randomArray[1];
        spotifyThisSong();
    });
}

// if (process.argv[2] == "do-what-it-says") {
//     doWhatItSays();
// }

var userCommand = process.argv[2];
    
if (userCommand == "spotify-this-song") {
        var songName = process.argv[3];
        spotifyThisSong();
    } else if (userCommand == "movie-this") {
        var movieName = process.argv[3];
        movieThis();
    } else if (userCommand == "do-what-it-says") {
        doWhatItSays();
    }