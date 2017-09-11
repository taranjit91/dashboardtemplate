var fetch = require('node-fetch');
var base64Img = require('base64-img'); // to convert image to base 64 and vice versa
var usersController = require('./userController.js');
// Displays the Details page to Update a Game
// find the device by id and populate the form

module.exports.DisplayUsersPage = (req, res) => {
    var session = req.session;
    return res.render('./admin/users', {
        title: ' Users',
        devices: session.devices,
        email: session.email
    });
};



module.exports.DisplayEdit = (req, res) => {

    var session = req.session;

    // get a reference to the id from the url
    let id = (req.params.id);

    console.log("url>> " + 'api.wetraq.ca/device/' + id);
    // find one game by its id
    fetch('http://api.wetraq.ca/device/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'cookie': session.c
        },
        credentials: 'same-origin',

    }).then(function(response) {

        return response.json();
    }).then(function(json) {
        var jsonResponse = (json);
        console.log("device details >> " + JSON.stringify(jsonResponse));


        return res.render('./device/deviceDetails', {
            title: 'Edit Device',
            devices: session.devices,
            email: session.email

        });
        // } else {
        //     return res.render('./error', {
        //         title: "error",
        //         message: jsonResponse.error.msg
        //     });
        //  }
    }).catch(function(error) {
        return res.render('./error', {
            title: "error",
            message: error
        });
    });
}