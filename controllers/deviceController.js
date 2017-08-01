var fetch = require('node-fetch');
// Displays the Details page to Update a Game
// find the device by id and populate the form
module.exports.DisplayEdit = (req, res) => {

    // get a reference to the id from the url
    let id = (req.params.id);
    console.log("url>> " + 'api.wetraq.ca/device/' + id);
    // find one game by its id
    fetch('http://api.wetraq.ca/device/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'cookie': "laravel_session=eyJpdiI6ImNOTW5DeUhxNFg2SEVOKzB2MkNPNFE9PSIsInZhbHVlIjoibHFRS1BkVkF4U3Y5M0c3YzMwMGo1MmtEQmpRdnRRRTFhcTFCakxiTU4wVEE0QnVoQVh5bXcza3JoRXFlOEsrVW1c" +
                "L3lpQm5YbHI4enZnYTFqdWEyMld3PT0iLCJtYWMiOiI1N2RhOWU2MGZjZTRiODA4MGE4YjlhZGM1Mzhl" +
                "MmZmODA0MmUzYjhmYjUzODQ5MzkwMjE3NmZlYjllYjM0YmIyIn0%3D; expires=Fri, 28-Jul-2017" +
                "21: 37: 19 GMT;Max - Age = 7200;path = /; HttpOnly"
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

module.exports.AddNewDevice = (req, res) => {

    // get a reference to the id from the url
    let id = (req.params.id);
    console.log("url>> " + 'api.wetraq.ca/device/' + id);
    // find one game by its id
    fetch('http://api.wetraq.ca/device/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'cookie': "laravel_session=eyJpdiI6IlwvajgrVFwvTFpcL0ZwXC9Ya0RPSlJxbWt3PT0iLCJ2YWx1ZSI6InlwZDFsZiswWVdyVjZhWVBFeDRBS2cyXC9mUnFNUWtNNFE1bkh3U3g5Z0lucGxIb0xvaWY5NmMyY043Ym1JQWE3eGhCTUdhbkFqK0JZeHdOMk45OGFwdz09IiwibWFjIjoiZDhiZGJlZTBkZjU2YzE2ODE3MjRlNjY3ZmM5ZjRlZWE1MTY4NWJmYTYwMmI2NjI2ZjQzMGI5YWExZGFiNmRhNSJ9; expires=Fri, 28-Jul-2017 21:54:11 GMT; Max-Age=7200; path=/; HttpOnly"
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