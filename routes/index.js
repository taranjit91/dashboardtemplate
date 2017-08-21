var express = require('express');
var router = express.Router();
// require the users controller
let usersController = require('../controllers/userController');
let geoFencingController = require('../controllers/geoFencingController');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'WeTraq Login' });
}).post('/', (req, res, next) => {
    usersController.signIn(req, res, next);
});

/* GET dashboard page. */
router.get('/dashboard', usersController.RequireAuth, function(req, res, next) {
    geoFencingController.DisplayPage(req, res, next);
}).post('/dashboard', (req, res, next) => {
    geoFencingController.UpdateBulkGeoFencing(req, res, next);
});

/* GET dashboard page. */
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

module.exports = router;