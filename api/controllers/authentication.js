var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var express = require('express');
var router = express.Router();

var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

router.post('/register', function (req, res) {
  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function (err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token": token
    });
  });
});


router.post('/login', function (req, res) {
  passport.authenticate('local', function (err, user, info) {
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token": token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
});

// TODO: Remove
router.get('/test', function (req, res, next) {
  res.json({ a: 123 });
});

module.exports = router;
