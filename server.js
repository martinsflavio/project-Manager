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
      cookieParser = require('cookie-parser'),
      flash        = require('connect-flash');


const PORT = process.env.NODE_ENV || 8080;

// view engine setup
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// express validator
app.use(expressVal()); // this line must be immediately after any of the bodyParser middlewares!
app.use(express.static(path.join(__dirname, 'public')));

// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


// import routes here
app.use('/', require('./routes/index-routes'));
app.use('/user', require('./routes/user-routes'));
app.use('/user', require('./routes/project-routes'));


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
db.sequelize.sync({force:true}).then(function() {
  // start server
  app.listen(PORT, () => {
    console.log("App listening on => " + PORT);
  });
});


//(TODO) CHANGE THE STATUS ON ERROR
