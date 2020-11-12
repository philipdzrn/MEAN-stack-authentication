var express = require('express');
var router = express.Router();

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

router.use(ctrlProfile);
router.use(ctrlAuth);

module.exports = router;
