'use strict';

const express     = require('express'),
      router      = express.Router(),
      db          = require('../models');


/////////////////////// search page ///////////////////////////////

//  new project form
router.get('/project/search', (req,res) => {
  res.render('search');
});

// search btn
router.post('/project/search', (req,res) => {
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



////////////////////// project page //////////////////////////////

// load  project form page
router.get('/project/form', (req,res) => {
  res.render('add-project');
});

//  add project
router.post('/project/new/:id', (req,res) => {
  let userId;
  let errors;
  let newProject = {};


  // Validate
  req.checkBody('subject', 'Title is required').notEmpty();
  req.checkBody('description', 'Description is required').notEmpty();

  userId = req.params.id;
  errors = req.validationErrors();


  if(errors){

    res.render('add-project',{errors:errors});

  } else {
    newProject.UserId = userId;
    newProject.subject = req.body.subject;
    newProject.description = req.body.description;

    db.Projects.create(newProject).then(regProject => {
      let projId = regProject.dataValues.id;

      res.redirect(`/user/project/open/${projId}`);
    }).catch(err => {
      res.render('error',err);
    });
  }
});

// open selected project on project view page
router.get('/project/open/:id', (req,res) => {
  let projId = req.params.id;
  let query = {where:{id: projId}};

  db.Projects.findOne(query).then(regProject => {
    let project = regProject.dataValues;

    res.render('project',project);
  }).catch(err => {
    res.render('err',err);
  });

});

////////////////////////////////////////////////////////////////////



module.exports = router;


