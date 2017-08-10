var fetch = require('node-fetch');
var usersController = require('./userController.js');

module.exports.Display = (req, res) => {

    var session = req.session;
    if (session.c) {

        return res.render('./schedule', {
            title: 'Schedule',
            email: session.email,
            devices: session.devices
        });
    }
}

// find the device by id and populate the form
module.exports.UpdateSchedule = (req, res) => {

    var session = req.session;
    if (session.c) {
        console.log("user logged in" + session.username);
        console.log('on updatre method &&& ' + session.c);
        // find one game by its id
        fetch('http://api.wetraq.ca/device/' + '00000000000000000002' + '/schedule', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'cookie': usersController.cookieValue()
            },
            credentials: 'same-origin',
            body: '{"device": {	"is_reporting": true,"reporting_days": [true, true, true, true, true, true, true],	"reporting_start": 0,	"reporting_end": 86400,	"reporting_freq": 600,"reporting_offset": -14400,"next_report": 1502281440	}}'
        }).then(function(response) {
            var responseStatus = response.status;
            if (responseStatus == 204)

                return res.render('./device/deviceDetails', {
                title: 'Edit Device',


            });
            else {
                return res.render('./schedule', {
                    title: "update failed",
                    message: 'Update Failed on devices'
                });
            }

        }).catch(function(error) {
            return res.render('./error', {
                title: "error",
                message: error
            });
        });
    } else {
        console.log("user not logged in");
    }


    // 
}


// updating more devices
module.exports.UpdateBulkSchedule = (req, res) => {

    console.log('on updatre method &&& ');
    // get a reference to the id from the url
    // let id = (req.params.id);
    //   console.log("url>> " + 'api.wetraq.ca/device/' + id + '/schedule');
    // find one game by its id
    fetch('http://api.wetraq.ca/device/schedule', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'cookie': usersController.cookieValue()
        },
        credentials: 'same-origin',
        body: '{' +
            '"device": {' +
            '"is_reporting": true,' +
            '"reporting_days": [true, true, true, true, true, true, true],' +
            '"reporting_start": 0,' +
            '"reporting_end": 86400,' +
            '"reporting_freq": 600,' +
            '"reporting_offset": -14400,' +
            '"next_report": 1502281440' +
            '},' +
            '"device_list": ["00000000000000000002", "00000000000000000003"]' +
            '}'
    }).then(function(response) {
        var responseStatus = response.status;
        if (responseStatus == 204)

            return res.render('./device/deviceDetails', {
            title: 'Edit Device',


        });
        else {
            return res.render('./schedule', {
                title: "update failed",
                message: 'Update Failed on devices'
            });
        }

    }).catch(function(error) {
        return res.render('./error', {
            title: "error",
            message: error
        });
    });
}