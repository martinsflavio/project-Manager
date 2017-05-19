'use strict';

const express = require('express'),
      router  = express.Router(),
      db      = require('../models'),
      passport = require('passport');

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

router.post('/register', passport.authenticate('local-signup', {
          successRedirect: '/',
          failureRedirect: '/register',
          failureFlash: true
      }
  ));

// Render Login Page
router.get('/login', (req, res) => {
  res.render('login');
});

 router.post('/login', passport.authenticate('local-signin', {
          successRedirect: '/',
          failureRedirect: '/login',
          failureFlash: true
      }
  ));


router.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
  });
});

module.exports = router;
