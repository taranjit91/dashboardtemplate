var fetch = require('node-fetch');
var usersController = require('./userController.js');
// Displays the Details page to Update a Game
// find the device by id and populate the form

module.exports.DisplayPage = (req, res) => {
    var session = req.session;
    return res.render('./dashboard_testing', {
        title: ' Geofencing',
        devices: session.devices,
        email: session.email,
        jsonResponse: session.jsonResponse,

    });
};



// updating more devices
module.exports.UpdateBulkGeoFencing = (req, res) => {
    var session = req.session;
    console.log('on update method geo fence ');
    var radius = req.body.seekbar_val;
    var devicearray = req.body.deviceids_json;
    var devicearray_off = req.body.deviceids_json;
    var lat = req.body.lat;
    var longi = req.body.longi;
    if (lat == null || longi == null) {
        lat = 43.7854787;
        longi = -79.2268406;
    }

    console.log(radius + " :: " + devicearray + " :: " + lat + "  :: " + longi);

    var device_arrayy = '{' +
        '"device": {' +
        '"geofencing": true,' +
        '"geofence_radius": ' + radius + ',' +
        '"geofence_latitude":' + lat + ',' +
        '"geofence_longitude":' + longi +
        '},' +
        '"device_list": ' + devicearray +
        '}';
    // console.log("body ::: " + device_arrayy);
    // // update device schedule
    // fetch('http://api.wetraq.ca/device/geofence', {
    //     method: 'PATCH',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'cookie': session.c
    //     },
    //     credentials: 'same-origin',
    //     //  body: '{ "device":         { "geofencing": true, "geofence_radius":' + radius + ', "geofence_latitude": 43.890975,          "geofence_longitude": -79.23227 },          "device_list": ["00000000000000000003", "00000000000000000002"] }'
    //     body: device_arrayy
    // }).then(function(response) {
    //     var responseStatus = response.status;
    //     console.log("response status >> " + "   " + session.c + "  " + response.status + "   " + response.message);
    //     if (responseStatus == 200) {
    //         updateGeofencingOff(session, radius, device_arrayy, lat, longi);
    //         // return res.redirect('/geofence');
    //     } else {
    //         return res.render('./', {
    //             title: "update failed",
    //             message: 'Update Failed on Geofence'
    //         });
    //     }

    // }).catch(function(error) {
    //     return res.render('./error', {
    //         title: "error",
    //         message: error
    //     });
    // });
}

function updateGeofencingOff(session, radius, device_array_off, lat, longi) {
    var session = session;


    console.log(radius + " :: " + devicearray + " :: " + lat + "  :: " + longi);

    var device_arrayy = '{' +
        '"device": {' +
        '"geofencing": false,' +
        '"geofence_radius": ' + radius + ',' +
        '"geofence_latitude":' + lat + ',' +
        '"geofence_longitude":' + longi +
        '},' +
        '"device_list": ' + devicearray +
        '}';
    console.log("body ::: " + device_arrayy);
    // update device schedule
    fetch('http://api.wetraq.ca/device/geofence', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'cookie': session.c
        },
        credentials: 'same-origin',
        //  body: '{ "device":         { "geofencing": true, "geofence_radius":' + radius + ', "geofence_latitude": 43.890975,          "geofence_longitude": -79.23227 },          "device_list": ["00000000000000000003", "00000000000000000002"] }'
        body: device_arrayy
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