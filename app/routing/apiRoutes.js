
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
/*




//  - REF CODE 2 -
// ROUTES
var friendArray = require('../data/friends.js')
var path = require('path');

//THIS IS THE MODULE THAT EXPORTS ALL ROUTES. 
module.exports = function(app) {


    //GET REQUEST - THIS RENDERS JSON DATA ON KODER FRIENDS
    app.get('/api/friends', function(req, res) {
            res.json(friendArray);
        })
        //POST REQUEST = THIS HANDLES DATA FOR SUBMISSION
    app.post('/api/friends', function(req, res) {
        var compatibleFriend = compatibleMember(req);
        friendArray.push(req.body);
        res.json(compatibleFriend);
    })
};

function compatibleMember(req) {
    var matchIndex = 0;
    var differences = [];

    for (var i = 0; i < friendArray.length; i++) {
        var totalDifference = 0;
        for (var j = 0; j < friendArray[i].scores.length; j++) {
            totalDifference += Math.abs(req.body.scores[j] - friendArray[i].scores[j]);
        }
        differences.push(totalDifference);
    }

    matchIndex = differences.indexOf(Math.min.apply(Math, differences));
    return friendArray[matchIndex];
}




//  - REF CODE 6 -

var friends = require('../data/friends.js');

module.exports = function(app){
    app.get('/api/friends', function(req, res) {
            res.json(friends);
        });

    app.post('/api/friends', function(req, res) {

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };
        var userData    = req.body;
        var userName    = userData.name;
        var userPhoto   = userData.photo;
        var userScores  = userData.scores;

        var totalDifference = 0;

        //loop through the friends data array of objects to get each friends scores
        for(var i = 0; i < friendsData.length-1; i++){
            console.log(friends[i].name);
            totalDifference = 0;

            //loop through that friends score and the users score and calculate the absolute difference between the two and push that to the total difference variable set above
            for(var j = 0; j < 10; j++){
                // We calculate the difference between the scores and sum them into the totalDifference
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
                // If the sum of differences is less then the differences of the current "best match"
                if (totalDifference <= bestMatch.friendDifference){

                    // Reset the bestMatch to be the new friend. 
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }

        // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
        // the database will always return that the user is the user's best friend).
        friends.push(userData);

        // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page. 
        res.json(bestMatch);
    });
};

*/