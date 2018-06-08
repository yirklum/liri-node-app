require("dotenv").config();

// Import keys
var keys = require("./keys.js");

// Import node modules
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var fs = require("fs");

// Take in command line input
var userInput = "";
var nodeArgs = process.argv;
    for (var i = 2; i < nodeArgs.length; i++) {
        userInput = nodeArgs[i];
        console.log(userInput);
    }

// Create myTweets function
// Show last 20 tweets and when they were created in terminal

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

// Set up circumstances for myTweets to be called
if (userInput == "my-tweets") {
    myTweets();
}

// Create spotifyThisSong function
// Show song information (artist, song name, a preview link and the album) in terminal
// If no song is provided, default to "The Sign" by Ace of Base
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

// Create movieThis function
// Output information about movie (title, year released, IMDB rating, Rotten Tomatoes rating, country, 
// language, plot, and actors)
// If user doesn't enter movie, output data from "Mr. Nobody"
// Use OMDB API to retrieve movie information
    
function movieThis() {
        if (movieName == undefined) {
        search = "Mr. Nobody";
        }   else {
        search = movieName;
        }
    var queryURL = "http://www.omdbapi.com/?t=" + search + "&y=&plot=full&tomatoes=true&apikey=trilogy";

    request(queryURL, function(error, response, body) {
    
        if (!error && response.statusCode === 200) {
        
//Use JSON to print data in string format
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

// Create doWhatItSays function
// Use fs Node to take text inside random.text and use it to call spotify-this-song for "I Want it That Way"

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

// Set up circumstances in which different functions are triggered, based on user input
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