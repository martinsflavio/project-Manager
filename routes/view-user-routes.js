'use strict';

const express = require('express'),
      db      = require('../models'),
      router  = express.Router();




/* GET user profile page */
router.get('/dashboard/:id', (req,res)=> {
  console.log('success on redirect to dashboard');

  let id = req.params.id;

  let projects = {
    where: {UserId: id},
    include: [db.Users]
  };
    console.log(projects);
  db.Projects.findAll(projects).then( regProject => {
    let user = regProject[0].dataValues.User.dataValues.userName;

    res.render('dashboard',{msg:user});
    console.log(regProject[0].dataValues);
  }).catch( error => {
    res.render('error', {msg:error});
  });

});


module.exports = router;