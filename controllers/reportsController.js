module.exports.DisplayPage = (req, res) => {
    return res.render('./partials/instantReports', {
        title: 'Reports',


    });
}