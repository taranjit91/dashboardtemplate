var express = require('express');
var router = express.Router();
// require the users controller
let reportsController = require('../controllers/reportsController');
let scheduleController = require('../controllers/scheduleController');

// get all devices



// GET the Game Details page in order to edit a new Game
router.get('/', (req, res, next) => {
    reportsController.DisplayPage(req, res);
})



module.exports = router;