'use strict';

const express = require('express'),
      db      = require('../models'),
      router  = express.Router();




/* GET user profile page */
router.get('/dashboard/:id', (req,res)=> {

  console.log('FROM DASHBOARD PAGE');

  let id = req.params.id;

  let user = {
    where: {id: id},
    //include: [db.Projects]
  };


  db.Users.findAll(user).then( regUser => {


  }).catch( error => {
    console.log("ERRRRRORRRR");
    res.render('error', {msg:error});
  });



});


module.exports = router;