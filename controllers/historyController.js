var fetch = require('node-fetch');
module.exports.DisplayPage = (req, res) => {
    var session = req.session;
    return res.render('./history', {
        title: 'Movement History',
        devices: session.devices,
        email: session.email,
        t: 0 + ''
    });
}

module.exports.SearchReport = (req, res) => {
    var session = req.session;
    var deviceId = req.body.deviceId;
    var daterange = req.body.daterange;

    var aa = daterange.split("-");

    var from = aa[0].trim();
    var to = aa[1].trim();

    from = new Date(from).getTime() / 1000; // convert date to unix timestamp
    to = new Date(to).getTime() / 1000; // convert date to unix timestamp
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>" + from / 1000);

    // search report from api
    fetch('http://api.wetraq.ca/device/' + 89302720396917290996 + '?from_time=' + from + '&to_time=' + to + '', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'cookie': session.c
        },
        credentials: 'same-origin'
    }).then(function(response) {
        var responseStatus = response.status;
        console.log("response status >> " + response.status + "   " + response.message);
        // if (responseStatus == 200)

        return res.render('./history', {
            title: 'Movement History',
            devices: session.devices,
            email: session.email,
            t: from + " :: " + to
        });
        // else {
        //     return res.render('./schedule', {
        //         title: "update failed",
        //         message: 'Update Failed on devices'
        //     });
        // }

    }).catch(function(error) {
        return res.render('./error', {
            title: "error",
            message: error
        });
    });
    // search report from api ends

    // console.log("values in search report :: " + from + " :: " + to + "  :: ");
    // session.t = from + " :: " + to;
    // return res.render('./history', {
    //     title: 'Movement History',
    //     devices: session.devices,
    //     email: session.email,
    //     t: from + " :: " + to,
    // });
}