
// Class assignment reference:
// 4. Your apiRoutes.js file should contain two routes:
// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

var friendsArray = require('../data/friends.js')
var path = require('path');

//THIS IS THE MODULE THAT EXPORTS ALL ROUTES. 
module.exports = function(app) {


// app.get obtains the current friendsArray and renders to JSON data
    app.get('/api/friends', function(req, res) {
            res.json(friendsArray);
        });

// app.post processes the user survey data and submits best-friend calculated result
    app.post('/api/friends', function(req, res) {
/*
req.body
req.body.name
req.body.photo
req.body.scores
*/

// Loop to compare the current user's answer scores 
//  across all existing user-database answer scores as stored in friendsArray

// Initialize all friends-evaluation calculation variables to 0 for each entry to this routine
var maxFriendScore = 0;
var bestFriendCalc = 0;
var bestFriendIndex = 0;

for (var i=0; i=req.body.length; i++) {

    for (var j=0; j<10; j++)  {
        bestFriendCalc += Math.abs( parseInt(friendsArray[i].scores[j]) - parseInt(req.body.scores[j]) );
        }
    console.log("bestFriendIndex = " + bestFriendIndex);
    console.log("bestFriendCalc = " + bestFriendCalc);
    console.log("maxFriendScore = " + maxFriendScore);

    if (bestFriendCalc > maxFriendScore) {
        maxFriendScore = bestFriendCalc;
        bestFriendIndex = i;
        }
    }
        friendsArray.push(req.body);
        res.json(friendsArray[i]);
    });
};
