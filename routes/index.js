var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'WeTraq Login' });
});

/* GET dashboard page. */
router.get('/dashboard', function(req, res, next) {
    res.render('dashboard', { title: 'Dashboard' });
});

/* GET dashboard page. */
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

module.exports = router;