var express = require('express');
var router = express.Router();
// require the users controller
let geofenceController = require('../controllers/geoFencingController.js');
var usersController = require('../controllers/userController.js');

// get all devices

router.get('/', usersController.RequireAuth, (req, res, next) => {
    geofenceController.DisplayPage(req, res, next);
}).post('/', (req, res, next) => {
    geofenceController.UpdateBulkGeoFencing(req, res, next);
});





module.exports = router;