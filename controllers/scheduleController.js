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
    var session = req.session;
    console.log('on updatre method &&& ');
    var days = req.body.days;
    var devicearray = req.body.deviceids_json;
    var freq = req.body.freq;
    var picker1 = req.body.timepicker1;
    picker1 = picker1.replace(":", ".");
    var startTime = parseFloat(picker1) * 60 * 60;

    var picker2 = req.body.timepicker2;
    picker2 = picker2.replace(":", ".");
    var endTime = parseFloat(picker2) * 60 * 60;


    freq = freq * 60 * 60; // converting value to seconds

    console.log(days + " :: " + devicearray + "  :: " + freq + " :: " + startTime + " :: " + endTime);

    // update device schedule
    fetch('http://api.wetraq.ca/device/schedule', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'cookie': session.c
        },
        credentials: 'same-origin',
        body: '{' +
            '"device": {' +
            '"is_reporting": true,' +
            '"reporting_days": ' + days + ',' +
            '"reporting_start": ' + startTime + ',' +
            '"reporting_end": ' + endTime + ',' +
            '"reporting_freq": ' + freq + ' ,' +
            '"reporting_offset": -14400,' +
            '"next_report": 1502281440' +
            '},' +
            '"device_list": ' + devicearray +
            '}'
    }).then(function(response) {
        var responseStatus = response.status;
        console.log("response status >> " + response.status + "   " + response.message);
        if (responseStatus == 200)

            return res.redirect('/device');
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