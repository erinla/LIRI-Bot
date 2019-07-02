
require("dotenv").config();

//////////////////////////////////////////////////////////////
////////////////////// Variables /////////////////////////////
//////////////////////////////////////////////////////////////

var keys = require("./keys.js");

var fs = require("fs");

var request = require("request");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var userInput = process.argv[2];
//var userInput = process.argv.slice(2).join(" ");
var userInput2 = process.argv[3];


//////////////////////////////////////////////////////////////
/////////////// What to do with user inputs //////////////////
//////////////////////////////////////////////////////////////


if (userInput === "concert-this") {
    concertThis();
} else if (userInput === "spotify-this-song") {
    spotifyThis();
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



function spotifyThis() {
    spotify.search(
        {
            type: "track",
            query: userInput2
        },
        function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log(data);
        });
};

//////////////////////////////////////////////////////////////
///////////////////// Movie This /////////////////////////////
//////////////////////////////////////////////////////////////
function movieThis() {
    if (userInput2 === undefined) {
        var mrNobody = "http://www.omdbapi.com/?t=mr-nobody&y=&plot=short&apikey=trilogy";
        axios.get(mrNobody).then(
            function (response) {
                console.log("****************************************")
                console.log("Movie Title: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country Produced: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("****************************************")
            })
    } else {
        var queryUrl = "http://www.omdbapi.com/?t=" + userInput2 + "&y=&plot=short&apikey=trilogy";
        axios.get(queryUrl).then(
            function (response) {
                console.log("****************************************")
                console.log("Movie Title: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country Produced: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("****************************************")

            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            })
    }
};
