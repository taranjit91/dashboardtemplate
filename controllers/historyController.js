var fetch = require('node-fetch');
module.exports.DisplayPage = (req, res) => {
    var session = req.session;
    return res.render('./history', {
        title: 'Movement History',
        devices: session.devices,
        email: session.email,
        report: '',
        t: 0 + '',
        daterange: ''
    });
}

module.exports.SearchReport = (req, res) => {
    var session = req.session;
    var deviceId = req.body.deviceId;
    var daterange = req.body.daterange;

    var aa = daterange.split("-");

    var from = aa[0].trim();
    var to = aa[1].trim();
    report: session.report

    from = new Date(from).getTime() / 1000; // convert date to unix timestamp
    to = new Date(to).getTime() / 1000; // convert date to unix timestamp


    /*******  API CALL ************* */
    var url = 'http://api.wetraq.ca/device/' + deviceId + '?from_time=' + from + '&to_time=' + to + '';
    console.log("search url in controller >> " + url);
    // search report from api
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'cookie': session.c
        },
        credentials: 'same-origin'
    }).then(function(response) {

        return response.json();
    }).then(function(json) {
        var jsonResponse = (json);

        var ress = JSON.stringify(jsonResponse);

        ress = JSON.parse(ress);
        console.log(ress.device.report.length + " is length");
        if (ress.device.report.length > 0) {
            return res.render('./history', {
                title: 'Movement History',
                devices: session.devices,
                report: ress.device,
                email: session.email,
                t: from + " :: " + to,
                daterange: daterange
            });
        } else {
            return res.render('./history', {
                title: "no reports",
                devices: session.devices,
                report: null,
                email: session.email,
                t: null,
                message: 'No Reports found for this search. Please try again.',
                daterange: daterange
            });
        }

    }).catch(function(error) {
        return res.render('./error', {
            title: "error",
            message: error
        });
    });
    // search report from api ends
    /*******  API CALL ************* */


}