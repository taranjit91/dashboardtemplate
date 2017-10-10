var fetch = require('node-fetch');
var base64Img = require('base64-img'); // to convert image to base 64 and vice versa
var usersController = require('./userController.js');
// Displays the Details page to Update a Game
// find the device by id and populate the form

module.exports.DisplayDevicesPage = (req, res) => {
    var session = req.session;

    fetch('http://api.wetraq.ca/device/', {
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

        session.device_all = jsonResponse.device;

        return res.render('./devices', {
            title: 'Devices',
            devices: session.devices,
            device_all: session.device_all,
            email: session.email
        });
        //  }
    }).catch(function(error) {
        return res.render('./error', {
            title: "error",
            message: error
        });
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
            title: 'Devices',
            device_name: jsonResponse.device.device_name,
            email: session.email,
            device_image: session.device_image

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

module.exports.EditDevice = (req, res) => {

    // get a reference to the id from the url
    var session = req.session;
    let id = (req.params.id);
    var device_name = req.body.deviceName;

    var base64st = req.body.base;
    console.log(":: " + device_name);
    var JSONtoUpload = '{"device":{"device_name":"' + device_name + '","device_image":"' + base64st + ' "}}';

    console.log("url>> " + 'api.wetraq.ca/device/' + id);
    console.log("json to upload >> " + JSONtoUpload);
    // find one game by its id
    fetch('http://api.wetraq.ca/device/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'cookie': usersController.cookieValue()
        },
        credentials: 'same-origin',
        body: JSONtoUpload,


    }).then(function(response) {

        console.log("device details edit >> " + response.status);

        if (response.status == 204) // edit was successful
        {

            return res.redirect("/device");
        }
        //     // }).catch(function(error) {
        //     //     return res.render('./error', {
        //     //         title: "error",
        //     //         message: error
        //     //     });
    });
}
module.exports.GenerateRequest = (req, res) => {

    var session = req.session;

    // get a reference to the id from the url
    let id = (req.params.id);
    var reportUrl = 'http://api.wetraq.ca/device/' + id + '/report/request';
    console.log("url>> " + reportUrl);
    // find one game by its id
    fetch(reportUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'cookie': usersController.cookieValue()
        },
        credentials: 'same-origin',

    }).then(function(response) {


        var jsonResponse = (json);
        console.log("device details >> " + JSON.stringify(jsonResponse));
        var lastReportUrl = 'http://api.wetraq.ca/device/' + id + '/report/last';
        if (response.status == 200) // response is 200 get last report
        {

            fetch(lastReportUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'cookie': usersController.cookieValue()
                },
                credentials: 'same-origin',

            }).then(function(response) {

                return response.json();
            }).then(function(json) {
                var jsonResponse = (json);
                console.log("last  report >> " + JSON.stringify(jsonResponse));
            });
        } else { // show error message when request is not generated

        }

    }).catch(function(error) {
        return res.render('./error', {
            title: "error",
            message: error
        });
    });
}


module.exports.AddNewDevice = (req, res) => {

    // get a reference to the id from the url
    let id = (req.params.id);
    console.log("url>> " + 'api.wetraq.ca/device/' + id);
    // find one game by its id
    fetch('http://api.wetraq.ca/device/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'cookie': req.session.cookie
        },
        credentials: 'same-origin',

    }).then(function(response) {

        return response.json();
    }).then(function(json) {
        var jsonResponse = (json);
        console.log("device details >> " + JSON.stringify(jsonResponse));


        return res.render('./device/deviceDetails', {
            title: 'Edit Device',
            jsonResponse: jsonResponse,

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