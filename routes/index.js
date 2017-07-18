var express = require('express');
var router = express.Router();
// require the users controller
let usersController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'WeTraq Login' });
}).post('/', (req, res, next) => {
    usersController.signIn(req, res, next);
});

/* GET dashboard page. */
router.get('/dashboard', function(req, res, next) {
    res.render('dashboard_user', { title: 'Dashboard' });
});

/* GET dashboard page. */
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

module.exports = router;