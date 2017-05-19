'use strict';

const express = require('express'),
      router  = express.Router(),
      db      = require('../models');

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
  console.log(req.body);
  // Validation
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('userName', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  errors = req.validationErrors();


  if(errors){

    res.render('register',{errors:errors});

  } else {
    newUser.name      = req.body.name;
    newUser.userName  = req.body.userName;
    newUser.email     = req.body.email;
    newUser.password  = req.body.password;



    db.Users.create(newUser).then(regUser => {

      req.flash('success_msg', 'You are registered and can now login');
      res.redirect('/login');

    }).catch( errors => {

      res.render('register',{msg:errors.errors});

    });
  }
});
///////////////// login page //////////////////

// Render Login Page
router.get('/login', (req, res) => {
  res.render('login');
});

// Authenticate User
router.post('/login', (req,res) => {
  let errors;

  // Validation
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();

  errors = req.validationErrors();

  if(errors){
    console.log(errors);
    res.render('login',{msg:errors});
  } else {

    let user = {
      where: {
        email: req.body.email,
        password: req.body.password
      }
    };

    db.Users.findOne(user).then(regUser => {
      let userId = regUser.dataValues.id;

      console.log(`/user/dashboard/${userId}`);

      res.redirect(`/user/dashboard/${userId}`);

    }).catch(errors => {

      res.render('login',{msg:[{msg:'Email or Password Invalid'}]});

    });

  }

});

///////////////////////////////////////////////

module.exports = router;
