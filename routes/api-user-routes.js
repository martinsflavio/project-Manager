const express     = require('express'),
      router      = express.Router(),
      db          = require('../models'),
      expressVal  = require('express-validator');


/* Stores new user in DB */
router.post('/new', (req,res) => {

  db.Users.create(req.body).then(user => {

    //testing route
    res.json(user);

  }).catch( error => {
    res.render('error',error);
  });
});


/* Validates Users */
router.post('/login', (req,res) => {
  let user = {
    where: {
      email: req.body.email,
      password: req.body.password
    },
  };

  db.Users.findOne(user).then( users => {
    if (users) {
      res.render('auth-page', users);
    } else {
      res.render('/view/login');
    }
  }).catch( error => {
    res.render('error',error);
  });
});

module.exports = router;

