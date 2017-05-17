'use strict';

const express     = require('express'),
      router      = express.Router(),
      db          = require('../models');




/* Create new Project */
router.post('/new', (req,res) => {

  db.Projects.create(req.body).then( project => {


    //testing route
    res.json(project);


  }).catch( error => {
    res.render('error', error);
  });
});



module.exports = router;