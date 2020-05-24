//important modules 
var express = require('express');
const path = require('path');
var logger = require('morgan');
var app = express();
var favicon = require('serve-favicon');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('./app-api/models/db')
var routes = require('./app-server/routes/index.js');
const routesApi = require('./app-api/api-routes/index.js');
var users = require('./app-server/routes/users');

//const session = require('express-session');


// view engine setup
app.set('views', path.join(__dirname,'app-server', 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// static files setup
app.use(express.static(path.join(__dirname, 'public')));

//app.use(session({secret:'my secret',resave:false,saveUninitialized:false}));

app.use('/', routes);
app.use('/users', users);
app.use('/api',routesApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
