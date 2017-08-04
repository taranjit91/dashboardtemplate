var fetch = require('node-fetch');
var createHash = require('sha.js');
var cookie = "test";
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
    console.log("username >> " + username + " >> " + password);
    var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64'); // create authorization string
    console.log('auth >>> ' + auth);
    fetch('http://wetraqapi.azurewebsites.net/login', {
        method: 'GET',
        headers: {
            Authorization: auth
        },
        credentials: 'same-origin',

    }).then(function(response) {
        cookie = response.headers.get('set-cookie'); // undefined
        console.log("setting cookie >> " + cookie);
        return response.json();
    }).then(function(json) {
        var jsonResponse = (json);

        if (jsonResponse.hasOwnProperty('user')) {
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




module.exports.cookieValue = function() {
    return cookie;
};




module.exports.displaySIgnInPage = (req, res) => {

    return res.render('./dashboard', {
        title: 'Login'

    })
}