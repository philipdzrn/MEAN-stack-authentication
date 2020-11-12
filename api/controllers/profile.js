var mongoose = require('mongoose');
var User = mongoose.model('User');
var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var auth = jwt({
  // TODO: change this
  secret: 'MY_SECRET',
  userProperty: 'payload',
  algorithms: ['sha1', 'RS256', 'HS256']
});

router.get('/profile', auth, (req, res) => {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }
});

module.exports = router;
