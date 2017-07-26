var fetch = require('node-fetch');
// Displays the Details page to Update a Game
// find the device by id and populate the form
module.exports.DisplayEdit = (req, res) => {

    // get a reference to the id from the url
    let id = (req.params.id);

    // find one game by its id
    fetch('https://api.wetraq.ca/device/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }

    }).then(function(response) {

        return response.json();
    }).then(function(json) {
        var jsonResponse = (json);
        console.log("device details >> " + jsonResponse);
        // if (jsonResponse.hasOwnProperty('user')) {
        //     return res.render('./dashboard_user', {
        //         title: 'Dashboard',
        //         jsonResponse: jsonResponse,
        //         email: jsonResponse.user.primary_email,
        //         devices: jsonResponse.user.device
        //     });
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