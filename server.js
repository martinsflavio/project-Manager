'use strict';

const express      = require('express'),
      exphbs       = require('express-handlebars'),
      path         = require('path'),
      bodyParser   = require('body-parser'),
      expressVal   = require('express-validator'),
      db           = require('./models'),
      app          = express(),
      passport     = require('passport'),
      session      = require('express-session'),
      cookieParser = require('cookie-parser');

const PORT = process.env.NODE_ENV || 8080;

// view engine setup
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressVal()); // this line must be immediately after any of the bodyParser middlewares!
app.use(express.static(path.join(__dirname, 'public')));

// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//load passport strategies
require('./passport/passport.js')(passport, db.Users);

// import routes here
app.use('/', require('./routes/view-index-routes'));

app.use('/view/user', require('./routes/view-user-routes'));
app.use('/api/user', require('./routes/api-user-routes'));

app.use('/view/user/project', require('./routes/view-project-routes'));
app.use('/api/user/project', require('./routes/api-project-routes'));

app.use('/test', require('./routes/test-routes'));


// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// initialize db
db.sequelize.sync().then(function() {
  // start server
  app.listen(PORT, () => {
    console.log("App listening on => " + PORT);
  });
});


//(TODO) CHANGE THE STATUS ON ERROR
