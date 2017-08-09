var express = require('express');
var router = express.Router();
// require the users controller
let scheduleController = require('../controllers/scheduleController');

// get all devices

router.get('/', (req, res, next) => {
    scheduleController.Display(req, res);
}).post('/', (req, res, next) => {
    scheduleController.UpdateSchedule(req, res, next);
});

router.get('/update', (req, res, next) => {
    scheduleController.Display(req, res);
}).post('/update', (req, res, next) => {
    scheduleController.UpdateBulkSchedule(req, res, next);
});



module.exports = router;