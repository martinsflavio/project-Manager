const express = require('express'),
      router = express.Router(),
      db = require('../models');

/* Send JSON with user information */
router.post('/sign-in', (req,res)=> {
  db.Users.create(req.body).then(user => {
    res.json(user);
  }).catch( error => {
    console.log(error);
    res.render('error',error);
  });

});




module.exports = router;
