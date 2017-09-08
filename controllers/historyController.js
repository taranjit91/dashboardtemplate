module.exports.DisplayPage = (req, res) => {
    var session = req.session;
    return res.render('./history', {
        title: 'Movement History',
        devices: session.devices,
        email: session.email,
        report: session.report

    });
}