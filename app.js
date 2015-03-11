var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var settings = require('./settings');
var flash = require('connect-flash');





var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('images',__dirname + '/public/images');
app.use(flash());
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session
var session = require('express-session');
/*
//mongo session
var MongoStore = require('connect-mongo')(session);
app.use(session({
    secret: settings.mongodb.cookieSecret,
    resave: true,
    saveUninitialized: true,
    autoRemove: 'native', // Default
    key: settings.mongodb.db,//cookie name
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
    store: new MongoStore({
        db: settings.mongodb.db,
        host: settings.mongodb.host,
        port: settings.mongodb.port
    })
}));
*/
//redis session
var RedisStore = require('connect-redis')(session);
app.use(session({
    secret: settings.redisdb.cookieSecret,
    resave: true,
    saveUninitialized: true,
    autoRemove: 'native', // Default
    key: settings.redisdb.db,//cookie name
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
    store: new RedisStore({
        host: settings.redisdb.host,
        port: settings.redisdb.port,
        ttl: 1800 // 过期时间
    })

}));


//upload
var multer  = require('multer');
app.use(multer({
    dest: app.get('images'),
    rename: function (fieldname, filename) {
        return filename;
    }
}));

routes(app);




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
