var express = require('express');
var router = express.Router();
// require the users controller
let deviceController = require('../controllers/deviceController');
let scheduleController = require('../controllers/scheduleController');

// get all devices


router.get('/', (req, res, next) => {
    deviceController.DisplayDevicesPage(req, res);
});

// edit the device using id
router.get('/:id', (req, res, next) => {
    deviceController.DisplayEdit(req, res);
}).post('/:id', (req, res, next) => {

});

// generate instant report using id
router.get('/report/:id', (req, res, next) => {
   
}).post('/report/:id', (req, res, next) => {

});



module.exports = router;