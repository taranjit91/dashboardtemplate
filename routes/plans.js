var express = require('express');
var router = express.Router();
// require the users controller
let plansController = require('../controllers/plansController');
var usersController = require('../controllers/userController.js');

// get all devices

router.get('/', usersController.RequireAuth, (req, res, next) => {
    plansController.DisplayPage(req, res, next);
});




module.exports = router;