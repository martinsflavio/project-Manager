const express     = require('express'),
      router      = express.Router(),
      db          = require('../models'),
      expressVal  = require('express-validator');


/* Stores new user in DB */
router.post('/new', (req,res) => {

  //(TODO) IT'S BETTER PASSING VALUES TO A LOCAL OBJ INSTEAD JUST PASSING req.body into DB
  db.Users.create(req.body).then(user => {

    //testing route
    res.json(user);

  }).catch( error => {
    res.render('error',error);
  });
});


/* Validates Users */
router.post('/login', (req,res) => {

  // (TODO) FIND HOW VALIDATE USER
  db.Users.findAll().then( users => {

    //testing route
    res.json(users);


  }).catch( error => {
    res.render('error',error);
  });
});

module.exports = router;
