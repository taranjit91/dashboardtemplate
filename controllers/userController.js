var fetch = require('node-fetch');
var createHash = require('sha.js');
var cookie = "test";
var user = null;
// render register page
module.exports.showRegisterPage = (req, res) => {
    return res.render('auth/register', {
        title: "Register",

    });
}


//  register post api
module.exports.register = (req, res) => {
    var username = req.body.email;
    var password = req.body.password;
    console.log("username >> " + username + " >> " + password);

    // create authorization string
    var sha256 = createHash('sha256');
    var passwordString = sha256.update(password, 'utf8').digest('hex')
    console.log(passwordString)

    var data = '{	"user": {"primary_email": "' + username + '","password": "' + passwordString + '","user_type":"C"}}';
    console.log("data json >> " + data);


    fetch('http://wetraqapi.azurewebsites.net/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    }).then(function(response) {

        return response.json();
    }).then(function(json) {
        var jsonResponse = (json);
        console.log("register api response >> " + jsonResponse);
        if (jsonResponse.hasOwnProperty('user')) {
            return res.render('./dashboard_user', {
                title: 'Dashboard',
                jsonResponse: jsonResponse,
                devices: jsonResponse.user.device,
                email: jsonResponse.user.primary_email
            });
        } else {
            return res.render('./error', {
                title: "error",
                message: jsonResponse.error.msg
            });
        }
    }).catch(function(error) {
        return res.render('./error', {
            title: "error",
            message: error
        });
    })
}



// login function 
module.exports.signIn = (req, res) => {

    var username = req.body.email;
    var password = req.body.password;
    var session = req.session;
    session.username = username;

    console.log("username >> " + username + " >> " + password);
    var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64'); // create authorization string
    console.log('auth >>> ' + auth);
    session.auth = auth;
    fetch('http://wetraqapi.azurewebsites.net/login', {
        method: 'GET',
        headers: {
            Authorization: auth
        },
        credentials: 'same-origin',

    }).then(function(response) {
        var c = response.headers.get('set-cookie'); // undefined
        cookie = c;
        session.c = c;

        console.log("setting cookie >> " + session.c);


        return response.json();
    }).then(function(json) {
        var jsonResponse = (json);
        session.devices = jsonResponse.user.device;
        session.email = jsonResponse.user.primary_email;
        if (jsonResponse.hasOwnProperty('user')) {
            user = JSON.stringify(jsonResponse);
            console.log("setting user variable >> " + user);
            return res.render('./dashboard_user', {
                title: 'Dashboard',
                jsonResponse: jsonResponse,
                email: jsonResponse.user.primary_email,
                devices: jsonResponse.user.device,

            });
        } else {
            cookie = null;
            return res.render('./login', {
                title: "login failed",
                message: jsonResponse.error.msg
            });
        }
    }).catch(function(error) {
        cookie = null;
        return res.render('./error', {
            title: "error",
            message: error
        });
    })
};
// get cookie value


module.exports.userDetails = function() {
    return user;
};

module.exports.cookieValue = function() {
    return cookie;
};

// create a function to check if the user is authenticated
module.exports.RequireAuth = (req, res, next) => {
    // check if the user is logged in
    if (!req.session.c) {
        return res.redirect('/');
    }
    next();
}


// module.exports.displaySignInPage = (req, res) => {

//     return res.redirect('/', {
//         title: 'Login Required'

//     })
// }