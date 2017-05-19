'use strict';

const express = require('express'),
      router  = express.Router(),
      db      = require('../models'),
      passport = require('passport'),
      session  = require('express-session');

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
          successRedirect: '/login',
          failureRedirect: '/register',
          failureFlash: true
      }
  ));

 // router.post('/register', function(req, res, next) {
 //      passport.authenticate('local-signup', {failureFlash:true}, function(err, user, info) {
 //       if (err) { return next(err); }
 //       if (!user) { return res.redirect('/login'); }
 //      req.logIn(user, function(err) {
 //        if (err) { return next(err); }
 //       return res.redirect('/dashboard/' + user.id);
 //     });
 //    })(req, res, next);
 //    });

// Render Login Page
router.get('/login', (req, res) => {
  res.render('login');
});

 // process the login form
    router.post('/login', function(req, res, next) {
      passport.authenticate('local-signin', {failureFlash:true}, function(err, user, info) {
       if (err) { return next(err); }
       if (!user) { return res.redirect('/login'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
       return res.redirect('/dashboard/' + user.id);
     });
    })(req, res, next);
    });


router.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
  });
});

module.exports = router;
