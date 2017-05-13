const express = require('express'),
      exphbs = require('express-handlebars'),
      path = require('path'),
      bodyParser = require('body-parser'),
      db = require('./models'),
      app = express();

const PORT = process.env.NODE_ENV || 8080;

// view engine setup
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// import routes here
app.use('/', require('./routes/view-auth-routes'));
app.use('/user', require('./routes/view-user-routes'));
app.use('/user', require('./routes/api-user-routes'));

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