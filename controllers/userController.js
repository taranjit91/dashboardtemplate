var fetch = require('node-fetch');

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
    var passwordString = 'Basic ' + new Buffer(password).toString('base64'); // create authorization string
    console.log('auth >>> ' + auth);
    fetch('http://wetraqapi.azurewebsites.net/register', {
        method: 'POST',
        headers: {
            Authorization: auth
        }

    }).then(function(response) {

        return response.json();
    }).then(function(json) {
        var jsonResponse = (json);

        if (jsonResponse.hasOwnProperty('user')) {
            return res.render('./dashboard_user', {
                title: 'Dashboard',
                jsonResponse: jsonResponse,
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
        }

    }).then(function(response) {

        return response.json();
    }).then(function(json) {
        var jsonResponse = (json);

        if (jsonResponse.hasOwnProperty('user')) {
            return res.render('./dashboard_user', {
                title: 'Dashboard',
                jsonResponse: jsonResponse,
                email: jsonResponse.user.primary_email,
                devices: jsonResponse.user.device
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


module.exports.displaySIgnInPage = (req, res) => {

    return res.render('./dashboard', {
        title: 'Login'

    })
}