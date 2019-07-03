
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
var moment = require("moment");

var userInput = process.argv[2];
var userInput2 = process.argv.slice(3).join(" ");



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
    // console.log(queryUrl)
    var axios = require("axios");
    axios.get(queryUrl).then(function (response) {
        // console.log(JSON.stringify(response.data))

        console.log("********************");
        console.log("Venue: " + response.data[0].venue.name);
        console.log("Venue location: " + response.data[0].venue.city);
        var dt = moment(response.data[0].datetime).format('MM/DD/YYYY')
        console.log("Date of the event: " + dt);
        console.log("********************");
    });
}

//////////////////////////////////////////////////////////////
//////////////////// Spotify This ////////////////////////////
//////////////////////////////////////////////////////////////

function spotifyThis(songFromFs) {
    var songName;
    if (songFromFs) {
        songName = songFromFs;
    } else if (userInput2) {
        songName = userInput2
    } else {
        songName = 'The Sign Ace of Base'
    }
    spotify.search(
        {
            type: "track",
            query: songName
        },
        function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Preview: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
        });
};

//////////////////////////////////////////////////////////////
///////////////////// Movie This /////////////////////////////
//////////////////////////////////////////////////////////////
function movieThis() {
    if (userInput2 === '') {
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
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Error", error.message);
                }
                console.log(error.config);
            })
    }
};
//////////////////////////////////////////////////////////////
////////////////// Do What It Says ///////////////////////////
//////////////////////////////////////////////////////////////
function doWhat() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        console.log(dataArr);
        var songFromFs = dataArr[1];
        if (dataArr[0] === 'spotify-this-song') {
            spotifyThis(songFromFs)
        }

    })
};

