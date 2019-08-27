const config = require('config');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

//routes inladen
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiChatRouter = require('./routes/api/v1/chat');

const passport = require('./passport/passport');

/*voordat de app start, eerst verbinding maken met data */
const mongoose = require('mongoose');
//gebruik nieuwste versie om indexes te gebruiken op true
mongoose.set('useCreateIndex',true);
//mongoose connect met variabele op heroku of variabele in config file
mongoose.connect(process.env.dbconn || config.get('Database.conn'), {
  useNewUrlParser: true
});
//connectie loggen
console.log(config.get('Database'));


/*app starten*/
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());

//vanaf dat json gestuurd word zal express deze parsen/ontleden
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//toestaan om te communiceren tussen meerdere
app.use(cors());

//homepagerouter
app.use('/', indexRouter);
app.use('/users', usersRouter);

//let birthday= 31;
/*middleware*/
//alle routes die hieraan voldoen worden met deze middleware verwerkt
app.use('/api/v1/chat', passport.authenticate('jwt', { session: false }), apiChatRouter);
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
