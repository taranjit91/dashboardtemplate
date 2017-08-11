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
    scheduleController.UpdateSchedule(req, res, next);
});

// //  GET the Game Details page in order to add a new Game
// router.get('/add', usersController.RequireAuth, (req, res, next) => {
//     deviceController.DisplayAdd(req, res);
// }).post('/add', usersController.RequireAuth, (req, res, next) => {
//     // POST process the Game Details page and create a new Game - CREATE
//     deviceController.CreateGame(req, res);
// });

// // GET the Game Details page in order to edit a new Game
// router.get('/:id', usersController.RequireAuth, (req, res, next) => {
//     deviceController.DisplayEdit(req, res);
// }).post('/:id', usersController.RequireAuth, (req, res, next) => {
//     // POST - process the information passed from the details form and update the document
//     deviceController.UpdateGame(req, res);
// });

// // GET - process the delete by user id
// router.get('/delete/:id', usersController.RequireAuth, (req, res, next) => {
//     deviceController.DeleteGame(req, res);
// });

module.exports = router;