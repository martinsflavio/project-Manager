'use strict';

const express     = require('express'),
      router      = express.Router(),
      db          = require('../models');

/* Stores new user in DB */
router.post('/register', (req,res) => {
  let newUser = {};
  let errors;

  // Validation
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('userName', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  req.checkBody('zipCode', 'Please enter a valid ZIP code').notEmpty().len(5,9);

  errors = req.validationErrors();


  if(errors){

    res.render('register',{msg:errors});

  } else {
    newUser.userName  = req.body.userName;
    newUser.email     = req.body.email;
    newUser.password  = req.body.password;
    newUser.zipCode   = req.body.zipCode;


    db.Users.create(newUser).then(regUser => {

      res.redirect('/login');

    }).catch( errors => {

      res.render('register',{msg:errors.errors});

    });
  }
});



/* Validates Users */
router.post('/login', (req,res) => {
  let errors;

  // Validation
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();

  errors = req.validationErrors();

  if(errors){
    res.render('login',{msg:errors});
  } else {

    let user = {
      where: {
        email: req.body.email,
        password: req.body.password
      }
    };

    db.Users.findOne(user).then(users => {

      if (users) {
        res.render('user-home');
      } else {
        res.render('login',{msg:"User name and Password ar wrong or doesn't exist"});
      }

    }).catch(errors => {
      res.render('login',{msg:errors});
    });

  }

});

module.exports = router;

