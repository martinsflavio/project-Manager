'use strict';

const express     = require('express'),
    router        = express.Router(),
    db            = require('../models'),
    passport      = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

///////////////// index page //////////////////

// Render Home Page
router.get('/', (req, res) => {
  res.render('index');
});

///////////////// register page ////////////////

// Render User Page
router.get('/register', (req, res) => {
  res.render('register');
});

// Add new User
router.post('/register', (req,res) => {
  let newUser = {};
  let errors;

  // Validation
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  errors = req.validationErrors();


  if(errors){

    res.render('register',{errors:errors});
      console.log(errors);
  } else {
    newUser.name      = req.body.name;
    newUser.username  = req.body.username;
    newUser.email     = req.body.email;
    newUser.password  = req.body.password;

    db.Users.createUser(newUser, data => {

      if(data.errors) {
        console.log(data.errors);
        res.render('register',{errors:data.errors});
      } else {
        req.flash('success_msg', 'You are registered and can now login');

        res.redirect('/login');
      }

    });



  }
});
///////////////// login page //////////////////

// Render Login Page
router.get('/login', (req, res) => {
  res.render('login');
});


passport.use(new LocalStrategy(
    (username, password, done) => {
      db.Users.getUserByUsername(username, user => {

        if(!user){
          return done(null, false, {message: 'Unknown User'});
        }

        db.Users.comparePassword(password, user.password, (err,isMatch) => {
          if (err) {return done(err);}

          if(isMatch){
            return done(null, user);
          } else {
            return done(null, false, {message: 'Invalid password'});
          }
        });
      });
    }));


passport.serializeUser((user, done) => {

  done(null, user.id);
});

passport.deserializeUser((id, done) => {

  db.Users.getUserById(id, user => {

    if (user) {
      done(null, user.get());
    } else {
      done(user.errors, null);
    }
  });
});






// Authenticate User
router.post('/login',
    passport.authenticate('local', {successRedirect:'/user/dashboard', failureRedirect:'/login',failureFlash: true}),
    function(req, res) {
      res.redirect('/');
});
///////////////////////////////////////////////

router.get('/logout', function(req, res){
  req.logout();

  req.flash('success_msg', 'You are logged out');

  res.redirect('/');
});

module.exports = router;

