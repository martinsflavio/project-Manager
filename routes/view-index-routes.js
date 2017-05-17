'use strict';

const express = require('express'),
      router  = express.Router();


/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});


/* GET new user page */
router.get('/register', (req, res) => {
  res.render('register');
});


/* GET Authenticate user page */
router.get('/login', (req, res) => {
  res.render('login');
});
module.exports = router;
