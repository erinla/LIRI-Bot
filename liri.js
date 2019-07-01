
require("dotenv").config();

//////////////////////////////////////////////////////////////
////////////////////// Variables /////////////////////////////
//////////////////////////////////////////////////////////////

var keys = require("./keys.js");

var fs = require("fs");

var request = require("request");

var userInput = process.argv[2];
//var userInput = process.argv.slice(2).join(" ");
var userInput2 = process.argv[3];


//////////////////////////////////////////////////////////////
/////////////// What to do with user inputs //////////////////
//////////////////////////////////////////////////////////////


if (userInput === "concert-this") {
    concertThis();
} else if (userInput === "spotify-this-song") {
    spotify();
} else if (userInput === "movie-this") {
    movieThis();
} else if (userInput === "do-what-it-says") {
    doWhat();
} else {
    console.log("Please enter one of the following: concert-this, spotify-this-song, movie-this, or do-what-it-says.");
}

//////////////////////////////////////////////////////////////
//////////////////// Concert This ////////////////////////////
//////////////////////////////////////////////////////////////

function concertThis() {
    var queryUrl = "https://rest.bandsintown.com/artists/" + userInput2 + "/events?app_id=codingbootcamp";
    console.log(queryUrl)
    var axios = require("axios");
    axios.get(queryUrl).then(function (response) {
        // console.log(JSON.stringify(response.data))

        console.log("********************");
        console.log("Venue: " + response.data[0].venue.name);
        console.log("Venue location: " + response.data[0].venue.city);
        console.log("Date of the event: " + response.data[0].datetime);
        console.log("********************");
    });
}

//////////////////////////////////////////////////////////////
//////////////////// Spotify This ////////////////////////////
//////////////////////////////////////////////////////////////
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


function spotify() {
    var spotify = new Spotify({
        id: SPOTIFY_ID,
        secret: SPOTIFY_SECRET
    });

    spotify
        .search({ type: 'track', query: 'All the Small Things' })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (err) {
            console.log(err);
        });

}