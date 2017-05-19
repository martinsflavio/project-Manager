'use strict';

const express     = require('express'),
      router      = express.Router(),
      db          = require('../models');



/* GET user profile page */
router.get('/dashboard/:id', (req,res)=> {

  console.log('FROM DASHBOARD PAGE');

  let id = req.params.id;

  let user = {
    where: {id: id},
    //include: [db.Projects]
  };


  db.Users.findAll(user).then( regUser => {

    //res.render('dashboard',{regUser});
   res.json(regUser);

  }).catch( error => {
    console.log("ERRRRRORRRR");
    res.render('error', {msg:error});
  });



});

module.exports = router;

