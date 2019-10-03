// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Friend Objects

var waitlist = [];
var friendsArray = [
    {
        name: "Andrew",
        photo: "",
        scores: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

app.get("/api/friends", function (req, res) {
    return res.json(friendsArray)
});

app.get("/api/tables", function (req, res) {
    return res.json(friendsArray);
});










//Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});