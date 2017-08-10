var express = require('express');
var router = express.Router();
// require the users controller
let scheduleController = require('../controllers/scheduleController');
var usersController = require('../controllers/userController.js');

// get all devices

router.get('/', usersController.RequireAuth, (req, res, next) => {
    scheduleController.Display(req, res, next);
}).post('/', (req, res, next) => {
    scheduleController.UpdateSchedule(req, res, next);
});

router.get('/update', usersController.RequireAuth, (req, res, next) => {
    scheduleController.Display(req, res);
}).post('/update', (req, res, next) => {
    scheduleController.UpdateBulkSchedule(req, res, next);
});



module.exports = router;