'use strict';

const express     = require('express'),
      router      = express.Router(),
      db          = require('../models'),
      passport    = require('../auth/passport');



/* GET user profile page */
router.get('/dashboard/:id', passport.ensureAuthenticated, (req,res)=> {
  let id = req.params.id;
  let query = {
    where:{id:id},
    include: [db.Projects]
  };

  db.Users.findOne(query).then(userData => {
    res.json(userData);
    //res.render('dashboard',userData);
  }).catch(err => {
    console.log('Error querying user data');
    console.log(err);
    req.flash('error_msg', 'User data not Found!');

    res.render(`error`,err);
  });




});

module.exports = router;

