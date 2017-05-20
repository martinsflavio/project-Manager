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
    include: [db.Projects,db.Proposals]
  };

  db.Users.findOne(query).then(userData => {
    let response = {
      user:{
        id        : userData.dataValues.id,
        name      : userData.dataValues.name,
        email     : userData.dataValues.email,
        projects  : userData.dataValues.Projects,
        proposals : userData.dataValues.Proposals
      }
    };

    console.log(response);

    res.json(response);

    //res.render('dashboard',userData);

  }).catch(err => {
    console.log('Error querying user data');
    console.log(err);
    req.flash('error_msg', 'User data not Found!');

    res.render(`error`,err);
  });




});

module.exports = router;

