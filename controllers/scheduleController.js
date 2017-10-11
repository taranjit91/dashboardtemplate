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



// updating more devices
module.exports.UpdateBulkSchedule = (req, res) => {
    var session = req.session;
    console.log('on updatre method &&& ');
    var days = req.body.days;
    var devicearray = req.body.checked_devices;
    var freq = req.body.freq;
    var picker1 = req.body.timepicker1;
    var startTime, endTime;
    if (picker1 != undefined) {
        picker1 = picker1.replace(":", ".");

        startTime = parseFloat(picker1) * 60 * 60;
    }

    var picker2 = req.body.timepicker2;
    if (picker2 != undefined) {
        picker2 = picker2.replace(":", ".");
        endTime = parseFloat(picker2) * 60 * 60;
    }

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
