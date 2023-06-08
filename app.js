var createError = require('http-errors');
var express = require('express');
var path = require('path');
const flash=require('connect-flash');
const passport= require('passport');
const session=require('express-session')
const jwt=require('jsonwebtoken')

const bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
var hbs=require('express-handlebars');
const dotenv=require('dotenv').config()


var logger = require('morgan');

const mongoose=require('mongoose')

var userRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
const dbconnects = require('./config/db');

dbconnects();
const port= 5000;
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// view engine setup


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine('.hbs',hbs.engine({extname:'.hbs',defaultLayout:'layout',layoutsDir:__dirname +'/views/layout/',partialsDir:__dirname +'/views/partials/'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret:'mysecret',
  cookie:{maxAge:600000},
  resave:false,
  saveUninitialized:false
}))
app.use(flash())

app.use((req,res,next)=>{
  res.locals.message=req.flash();
  next();
});

app.use(passport.initialize());
app.use(passport.session());


//GOOGLE-AUTH.

app.listen(port,()=>{
   console.log(`server running started ${port}`)
})



app.use('/', userRouter);
app.use('/admin', adminRouter);

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
