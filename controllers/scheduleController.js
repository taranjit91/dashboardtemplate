var fetch = require('node-fetch');
var usersController = require('./userController.js');

module.exports.Display = (req, res) => {
    return res.render('./schedule', {
        title: 'Schedule',
        email: ''
    });
}

// find the device by id and populate the form
module.exports.UpdateSchedule = (req, res) => {

    console.log('on updatre method &&& ');
    // get a reference to the id from the url
    // let id = (req.params.id);
    //   console.log("url>> " + 'api.wetraq.ca/device/' + id + '/schedule');
    // find one game by its id
    fetch('http://api.wetraq.ca/device/' + '00000000000000000002' + '/schedule', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'cookie': usersController.cookieValue()
        },
        credentials: 'same-origin',
        body: '{	"device": {	"is_reporting": true,"reporting_days": [true, true, true, true, true, true, true],	"reporting_start": 0,	"reporting_end": 86400,	"reporting_freq": 600,"reporting_offset": -14400,"next_report": 1501889254	}}'
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