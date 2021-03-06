const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const port = 3080;
const bodyParser = require('body-parser');


// Connect to MongoDB
// const url = "mongodb+srv://ScraperUser:F70vBi0jVsFPF5je@cluster0.sdafj.mongodb.net/items?retryWrites=true&w=majority";
// const url = "mongodb+srv://jalend:Jdindin98!@vega.gbbi0.mongodb.net/vega?";
// mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');
var crawlerRouter = require('./routes/ecomm_crawler');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);
app.use('/ecomm_crawler', crawlerRouter); // *FOR NOW: on search, crawl web w/ rust prog
// catch 404 (page not found in server) and forward to error handler
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

app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
