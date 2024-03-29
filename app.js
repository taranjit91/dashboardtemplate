var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var bodyParser = require('body-parser');

// setting routes
var index = require('./routes/index');
var users = require('./routes/users');
var devices = require('./routes/device');
var schedule = require('./routes/schedule');
var reports = require('./routes/instantreports');
var geofence = require('./routes/geofence');
var plans = require('./routes/plans');
var history = require('./routes/history');
var adminuser = require('./routes/adminuser');

// setting routes ends

// node-fetch is for coonecting to apis
var fetch = require('node-fetch');

var app = express();

// for session
var cookieParser = require('cookie-parser');
var session = require('express-session');
// session dependencies ends


app.use(cookieParser());
app.use(session({
    secret: "fd34s@!@dfa453f3DF#$D&W",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: !true }
}));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', index);
app.use('/users', users);
app.use('/device', devices);
app.use('/schedule', schedule);
app.use('/geofence', geofence);
app.use('/instantReports', reports);
app.use('/history', history);
app.use('/plans', plans);
app.use('/adminuser', adminuser);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = fetch;
module.exports = app;