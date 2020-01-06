var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dbroute = require('./routes/mdb');
var jwtfile = require('./routes/jwtdemo');
var multer = require('./routes/multer');
var app = express();
// mongoos setup
const remoteURl = 'mongodb+srv://kapil:kapil123@myfirstcluster-srds2.mongodb.net/test?retryWrites=true&w=majority'
var mongoose = require('mongoose');
mongoose.connect(remoteURl || 'mongodb://localhost:27017/multerDB' ,{useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log(' we are connected!');
});

var debug = require('debug')('expressgeneratordemo:server');
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(require('path').join(__dirname,'/public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dbs', dbroute);
app.use('/jwt', jwtfile);
app.use('/multer', multer);
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
// neawer changes in support branch addding only