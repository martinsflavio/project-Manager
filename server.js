'use strict';

const express            = require('express'),
      exphbs             = require('express-handlebars'),
      path               = require('path'),
      bodyParser         = require('body-parser'),
      expressValidator   = require('express-validator'),
      db                 = require('./models'),
      app                = express(),
      passport           = require('passport'),
      session            = require('express-session'),
      cookieParser       = require('cookie-parser'),
      flash              = require('connect-flash');


const PORT = process.env.NODE_ENV || 8080;

// view engine setup
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set static folder
app.use(express.static(path.join(__dirname, 'public')));


// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
    let namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
// Connect Flash
app.use(flash());

// Global Vars
app.use( (req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


// import routes here
app.use('/', require('./routes/index-routes'));
app.use('/user', passport.ensureAuthenticated, require('./routes/user-routes'));
app.use('/user', passport.ensureAuthenticated, require('./routes/project-routes'));
app.use('/user', passport.ensureAuthenticated, require('./routes/proposal-routes'));
app.use('/user', passport.ensureAuthenticated, require('./routes/comment-routes'));

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
