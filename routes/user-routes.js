'use strict';

const express     = require('express'),
      router      = express.Router(),
      db          = require('../models');



router.get('/dashboard', (req,res)=> {
 res.render('dashboard');
});


router.get('/dashboard/:id', (req,res) =>{
  let userId = req.params.id;

  let query = {
   where:{id:userId},
   include: [db.Projects,db.Proposals]
   };

   db.Users.findOne(query).then(userData => {
     let user = {
     user:{
       id        : userData.dataValues.id,
       name      : userData.dataValues.name,
       email     : userData.dataValues.email,
       projects  : userData.dataValues.Projects,
       proposals : userData.dataValues.Proposals
     }
   };
     res.render('dashboard',user);

   }).catch(err => {
   console.log('Error querying user data');
   console.log(err);
   req.flash('error_msg', 'User data not Found!');

   res.render(`error`,err);
   });




});

module.exports = router;

