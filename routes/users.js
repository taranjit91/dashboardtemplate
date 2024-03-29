var express = require('express');
var router = express.Router();
// require the users controller
let usersController = require('../controllers/userController');
/*  users sign in. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
}).post('/', (req, res, next) => {
    usersController.signIn(req, res, next);
});

/*  users sign in. */
router.get('/register', function(req, res, next) {
    usersController.showRegisterPage(req, res, next);
}).post('/register', (req, res, next) => {
    usersController.register(req, res, next);
});


//  // create a function to check if the user is authenticated
// module.exports.RequireAuth = (req, res, next) => {
//   // check if the user is logged in
//   if(!firebaseAuth.currentUser) {
//     return res.redirect('/users/login');
//   }
//   next();
// }

module.exports = router;