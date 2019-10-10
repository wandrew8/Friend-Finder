// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.static('app'));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Friends object array
var userInfo = [];
var friendsArray = [
    {
        name: "Ralph Finnigan",
        scores: ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
        summary: "Howdy, buddy. It looks like we're a match! My name is Ralph Finnigan. I'm sure we can become good friends. Send me a message. I'd love to learn more about you.",
        photo: "https://cdn.pixabay.com/photo/2015/08/05/04/02/people-875597_1280.jpg",
        email: "ralph44@gmail.com"
    },
    {
        name: "Sara Summers",
        scores: [1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
        summary: "Heya! My name is Sara Summers. I'm so glad that we're a match. I'm sure we can become good friends. Send me a message. I'd love to learn more about you.",
        photo: "https://cdn.pixabay.com/photo/2016/03/27/21/15/party-1284304_1280.jpg",
        email: "sarasum@gmail.com"
    },
    {
        name: "Cody Mathews",
        scores: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        summary: "Hey, how's it going? My name is Cody. I'm so glad that we're a match. I'm sure we can become good friends. Send me a message. I'd love to learn more about you.",
        photo: "https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_1280.jpg",
        email: "math67@gmail.com"
    },
    {
        name: "Josh Andrews",
        scores: [2, 3, 2, 3, 2, 3, 2, 3, 2, 3],
        summary: "Hello! My name is Josh Andrews. I'm so glad that we're a match. I'm sure we can become good friends. Send me a message. I'd love to learn more about you.",
        photo: "https://cdn.pixabay.com/photo/2016/09/24/03/20/passion-1690965_1280.jpg",
        email: "56joshand@gmail.com"
    },
    {
        name: "Leah Micheals",
        scores: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        summary: "Hi! My name is Leah. I'm so glad that we're a match. I'm sure we can become good friends. Send me a message. I'd love to learn more about you.",
        photo: "https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_1280.jpg",
        email: "leahm77@gmail.com"
    },
    {
        name: "John Andrews",
        scores: [3, 4, 3, 4, 3, 4, 3, 4, 3, 4],
        summary: "Hey, My name is John. I'm so glad that we're a match. I'm sure we can become good friends. Send me a message. I'd love to learn more about you.",
        photo: "https://cdn.pixabay.com/photo/2015/07/20/07/12/people-852428_1280.jpg",
        email: "john223@gmail.com"
    },
    {
        name: "Andrew Johnsom",
        scores: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        summary: "How's it going? My name is Andrew Johnson. I'm so glad that we're a match. I'm sure we can become good friends. Send me a message. I'd love to learn more about you.",
        photo: "https://cdn.pixabay.com/photo/2017/08/12/18/31/male-2634974_1280.jpg",
        email: "andrewjj@gmail.com"
    },
    {
        name: "Eric Laurence",
        scores: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        summary: "Hey, Eric here. I'm so glad that we're a match. I'm sure we can become good friends. Send me a message. I'd love to learn more about you.",
        photo: "https://cdn.pixabay.com/photo/2015/08/14/15/28/smiling-888532_1280.jpg",
        email: "ericlau@gmail.com"
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
    res.json(friendsArray);
})
app.post("/api/friends", function (req, res) {
    var userInput = JSON.stringify(req.body);
    console.log("The user input the following data: " + userInput)
    var userScores = req.body.scores;
    console.log("The user scores are as follows: " + userScores)

    // Compute best friend match
		var minDiff = 10000; // Make the initial value big for comparison

		// Examine all existing friends in the list
		for (var i = 0; i < friendsArray.length; i++) {

			// Compute differenes for each question
			var totalDiff = 0;
			for (var j = 0; j < userScores.length; j++) {
			var diff = Math.abs(friendsArray[i].scores[j] - userScores[j]);
                totalDiff += diff
            }
            
			// If lowest difference, record the friend match
			if (totalDiff < minDiff) {
                match = i;
                minDiff = totalDiff;
				
			}
		}

		// Add new user
        friendsArray.push(req.body);
        console.log("You're a match with " + JSON.stringify(friendsArray[match]));
        res.json(friendsArray[match]);
});

app.post("/api/friends", function(req, res) {
    console.log("The user has the following scores: " + req.body.scores);

    // Receive user details (name, photo, scores)
    var user = req.body;
});


//Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});