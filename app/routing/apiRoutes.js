var friends = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    var match = {
      name: "",
      photo: "",
      difference: Infinity
    };

    var userData = req.body;
    var userScores = userData.scores;

    var totalD;

    for (var i = 0; i < friends.length; i++) {
      var potentialF = friends[i];
      totalD = 0;

      console.log(potentialF.name);

    for (var j = 0; j < potentialF.scores.length; j++) {
        var potentialFScore = potentialF.scores[j];
        var userScore = userScores[j];

        totalD += Math.abs(parseInt(userScore) - parseInt(potentialFScore));
      }

      if (totalD <= match.difference) {
        match.name = potentialF.name;
        match.photo = potentialF.photo;
        match.difference = totalD;
      }
    }

    friends.push(userData);

    res.json(match);
  });
};
