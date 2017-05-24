'use strict';

const express     = require('express'),
    router        = express.Router(),
    db            = require('../models'),
    passport      = require('../auth/passport');


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

  } else {
    newUser.name      = req.body.name;
    newUser.username  = req.body.username;
    newUser.email     = req.body.email;
    newUser.password  = req.body.password;

    db.Users.createUser(newUser, data => {

      if(data.errors) {
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


// Authenticate user
router.post('/login',
    passport.authenticate('local',
        {
          successRedirect:'/',
          failureRedirect:'/login',
          failureFlash: true
        }),
    function(req, res) {
      res.redirect('/');
    });
//////////////////// logout ///////////////////////////

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});
///////////////////////////////////////////////////////
module.exports = router;

