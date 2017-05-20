'use strict';

const express     = require('express'),
      router      = express.Router(),
      db          = require('../models'),
      passport    = require('../auth/passport');


/////////////////////// search page ///////////////////////////////

//  new project form
router.get('/project/search',passport.ensureAuthenticated, (req,res) => {
  res.render('search');
});

// search btn
router.post('/project/search', passport.ensureAuthenticated, (req,res) => {
  let searchFor = {};
  let errors;

  // Validation
  req.checkBody('subject', 'Subject is required').notEmpty();

  errors = req.validationErrors();

  if(errors){
    req.flash('error_msg', 'Project Title Required!');
   // res.redirect('search');

  } else {

    db.Projects.findAll({where:{subject:req.body.subject}}).then(data => {
      let project = data[0].dataValues;

      console.log(project);
      res.render('search', {project:project});

    }).catch(err => {

      res.render('error',error);

    })

  }
});



//////////////////////////////// project page //////////////////////



//  add project
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
      res.json(regProject);
      //res.redirect(`/user/project/${regProject.id}`);

    }).catch(errors => {
      res.render('add-project',{msg:errors});
    });
  }
});


// load  project page whit a project
router.get('/project/open/:id', passport.ensureAuthenticated, (req,res) => {
  let id = req.params.id;
  let query = {where:{id:id}};

  db.Projects.findOne(query).then(regProject => {
    res.json(regProject);
  }).catch(err => {
    res.render('err',err);
  });
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


