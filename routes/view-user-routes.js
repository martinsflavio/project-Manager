const express = require('express'),
      db      = require('../models'),
      router  = express.Router();



/* GET user profile page */
router.get('/user-home', (req,res)=> {
  let userId = req.params.id;

  let query = {
    where: {id: userId},
    include: [
      {model: db.Projects, where: {UserId:userId}}
    ]
  };



  db.Users.findAll(query).then( projects => {
   // res.render('profile',{title:'Profile Page', body:'Successfully Logged', projectsList: projects});


    res.json(projects);


  }).catch( error => {
    res.render('error', error);
  });

});


module.exports = router;