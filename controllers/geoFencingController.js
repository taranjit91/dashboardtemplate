var fetch = require('node-fetch');
var usersController = require('./userController.js');
// Displays the Details page to Update a Game
// find the device by id and populate the form

module.exports.DisplayPage = (req, res) => {
    var session = req.session;
    return res.render('./dashboard_user', {
        title: ' Dashboard',
        devices: session.devices,
        email: session.email,
        jsonResponse: session.jsonResponse,

    });
};



// updating more devices
module.exports.UpdateBulkGeoFencing = (req, res) => {
    var session = req.session;
    console.log('on updatre method geo fence ');
    var radius = req.body.radius;
    var devicearray = req.body.deviceids_json;
    var lat = req.body.lat;
    var longi = req.body.longi;
    if (lat == null || longi == null) {
        lat = 43.7854787;
        longi = -79.2268406;
    }

    console.log(radius + " :: " + devicearray + " :: " + lat + "  :: " + longi);

    // update device schedule
    fetch('http://api.wetraq.ca/device/geofence', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'cookie': session.c
        },
        credentials: 'same-origin',
        body: '{ "device":         { "geofencing": true, "geofence_radius":' + radius + ', "geofence_latitude": 43.890975,          "geofence_longitude": -79.23227 },          "device_list": ["00000000000000000003", "00000000000000000002"] }'
            // body: '{' +
            //     '"device": {' +
            //     '"geofencing": true,' +
            //     '"geofence_radius": ' + radius + "," +
            //     '"geofence_latitude":' + lat + "," +
            //     '"geofence_longitude":' + longi +
            //     '},' +
            //     '"device_list": ' + devicearray +
            //     '}'
    }).then(function(response) {
        var responseStatus = response.status;
        console.log("response status >> " + "   " + session.c + "  " + response.status + "   " + response.message);
        if (responseStatus == 200)

            return res.redirect('/geofence');

        else {
            return res.render('./', {
                title: "update failed",
                message: 'Update Failed on Geofence'
            });
        }

    }).catch(function(error) {
        return res.render('./error', {
            title: "error",
            message: error
        });
    });
}