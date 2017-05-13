const express = require('express'),
      router  = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Home Page', body:'Project Manager'});
});


/* GET new user page */
router.get('/view/sign-in', (req, res) => {
  res.render('sign-in',{ title: 'New User', body:'Project Manager'});
});


/* GET Authenticate user page */
router.get('/view/login', (req, res) => {
  res.render('login',{ title: 'Login', body:'Project Manager'});
});


module.exports = router;