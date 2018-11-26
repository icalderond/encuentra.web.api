
//For run API rest
// DEBUG=encuentra.web.apirest:* npm start

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('./config');

var index = require('./routes/index');
var iglesias = require('./routes/iglesias');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//--------Section for api rest start--------
var mysql=require("mysql");
// Database connection
app.use(function(req,res,next) {
	global.connection=mysql.createConnection({
		host:config.db.host,
		user:config.db.user,
		password: config.db.password,
		database: config.db.database
	});
	connection.connect();
	next();
});

app.use('/',index);
app.use('/api/v1/iglesias', iglesias);
//--------Section for api rest end----------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
