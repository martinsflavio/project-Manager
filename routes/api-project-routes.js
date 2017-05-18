'use strict';

const express     = require('express'),
      router      = express.Router(),
      db          = require('../models');




/* Create new Project */
router.post('/register/:id', (req,res) => {
  let userId = req.params.id;
  let errors;
  let newProject = {};


  // Validate
  req.checkBody('projectSubject', 'Title is required').notEmpty();
  req.checkBody('projectDescription', 'Description is required').notEmpty();
  req.checkBody('zipCode', 'Zip Code is required').notEmpty();

  errors = req.validationErrors();


  if(errors){

    res.render('add-project',{msg:errors});

  } else {
    newProject.UserId = req.params.id;
    newProject.projectSubject = req.body.projectSubject;
    newProject.projectDescription = req.body.projectDescription;
    newProject.zipCode = req.body.zipCode;

    db.Projects.create(newProject).then(regProject => {

      res.redirect('/view/user/dashboard/' + userId);

    }).catch(error => {
      res.render('error', error);
    });
  }
});



module.exports = router;