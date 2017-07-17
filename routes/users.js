var express = require('express');
var router = express.Router();
// require the users controller
let usersController = require('../controllers/userController');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
}).post('/', (req, res, next) => {
    usersController.signIn(req, res, next);
});


module.exports = router;