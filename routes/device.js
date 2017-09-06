var express = require('express');
var router = express.Router();
// require the users controller
let deviceController = require('../controllers/deviceController');
let scheduleController = require('../controllers/scheduleController');

// get all devices


router.get('/', (req, res, next) => {
    deviceController.DisplayDevicesPage(req, res);
});

// GET the Game Details page in order to edit a new Game
router.get('/:id', (req, res, next) => {
    deviceController.DisplayEdit(req, res);
}).post('/:id', (req, res, next) => {
    deviceController.EditDevice(req, res);
});



module.exports = router;