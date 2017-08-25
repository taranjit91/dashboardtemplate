module.exports.DisplayPage = (req, res) => {
    var session = req.session;
    return res.render('./plans', {
        title: 'Plans',
        devices: session.devices,
        email: session.email
    });
}