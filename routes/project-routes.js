'use strict';

const express     = require('express'),
      router      = express.Router(),
      db          = require('../models');



/////////////////////// project page ///////////////////////////////
/* Create new Project */
router.post('/project/create/:id', (req,res) => {
  let userId = req.params.id;
  let errors;
  let newProject = {};


  // Validate
  req.checkBody('subject', 'Title is required').notEmpty();
  req.checkBody('description', 'Description is required').notEmpty();

  errors = req.validationErrors();


  if(errors){

    res.render('add-project',{msg:errors});

  } else {
    newProject.UserId = req.params.id;
    newProject.subject = req.body.subject;
    newProject.description = req.body.description;


    db.Projects.create(newProject).then(regProject => {

      res.redirect(`/user/project/${regProject.id}`);

    }).catch(errors => {
      res.render('add-project',{msg:errors});
    });
  }
});
////////////////////////////////////////////////////////////////////


/////////////////// proposal forms ///////////////////////////////
router.post('/proposal/create/:userid/:projid', (req,res) => {
  let errors;
  let newProposal = {};

  // Validate
  req.checkBody('subject', 'Title is required').notEmpty();
  req.checkBody('description', 'Description is required').notEmpty();

  errors = req.validationErrors();


  if(errors){

    res.render('add-project',{msg:errors});

  } else {
    newProposal.UserId      = req.params.id;
    newProposal.subject     = req.body.subject;
    newProposal.description = req.body.description;

  }


  let query = {
      subject   : req.body.subject,
      body      : req.body.subject,
      ProjectId : req.params.projid,
      UserId    : req.params.userid
  };


  db.Proposals.create(query).then(regProposal => {

  }).catch(err => {
    let errorsList = [];
    err.errors.forEach(dbErrors =>{
      errorsList.push({msg : dbErrors.message});
    });
    render('add-project',{errors:errors});
  });

});

module.exports = router;


