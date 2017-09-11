var express = require('express');
var router = express.Router();
// require the users controller
let adminUserController = require('../controllers/adminUserController');
var usersController = require('../controllers/userController.js');

// get all users

router.get('/', usersController.RequireAuth, (req, res, next) => {
    adminUserController.DisplayUsersPage(req, res, next);
}).post('/', (req, res, next) => {

});

// add new users
router.get('/adminuser/add', usersController.RequireAuth, (req, res, next) => {

}).post('/adminuser/add', (req, res, next) => {

});

// edit existing user

router.get('/adminuser/edit', usersController.RequireAuth, (req, res, next) => {

}).post('/adminuser/edit', (req, res, next) => {

});
// deactivate user
router.get('/adminuser/deactivate', usersController.RequireAuth, (req, res, next) => {

}).post('/adminuser/deactivate', (req, res, next) => {

});
//delete  existing user
router.get('/adminuser/delete', usersController.RequireAuth, (req, res, next) => {

}).post('/adminuser/delete', (req, res, next) => {

});

module.exports = router;