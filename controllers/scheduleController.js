var fetch = require('node-fetch');
var usersController = require('./userController.js');




var users = usersController.userDetails();
var mail;
if (users != null) {
    mail = users.user.primary_email;
} else {
    mail = '';
}

module.exports.Display = (req, res) => {
    return res.render('./schedule', {
        title: 'Schedule',
        email: mail

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