require('dotenv').config();

require('./config/database');
require('./config/passport'); // import to start passport when server runs, also see line 41/42

const router = require('./routes/router'); // import router file
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const authRouter = require('./routes/authRouter');
const methodOverride = require('method-override');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.unsubscribe(router);
app.use(methodOverride('_method'))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ url: process.env.DATABASE_URL }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res, next){
  res.locals.user = req.user;
  next();
});

app.use('/', router);
app.use('/', authRouter);

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
