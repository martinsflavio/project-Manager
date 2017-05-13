const express = require('express'),
      db      = require('../models'),
      router  = express.Router();

/* GET user profile page */
router.get('/profile', (rep,res)=> {
  db.Projects.findAll().then( projects => {
    res.render('profile',{title:'Profile Page', body:'Successfully Logged', projectsList: projects});
  }).catch( error => {
    res.render('error', error);
  });
});

/* Create new Project */
router.post('/profile/new', (req,res) => {
  db.Projects.create(req.body).then( project => {

    //testing route
    res.json(project);

  }).catch( error => {
    res.render('error', error);
  });
});


module.exports = router;