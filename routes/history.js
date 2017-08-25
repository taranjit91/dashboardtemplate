var express = require('express');
var router = express.Router();
// require the users controller
let historyController = require('../controllers/historyController');
var usersController = require('../controllers/userController.js');

// get all devices

router.get('/', usersController.RequireAuth, (req, res, next) => {
    historyController.DisplayPage(req, res, next);
});

module.exports = router;