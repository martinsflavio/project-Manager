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
  let query;
  let errors;

  // Validation
  req.checkBody('subject', 'Subject is required').notEmpty();

  errors = req.validationErrors();
  query  = {
    where:{subject:req.body.subject},
    include: [db.Users]
  };

  if(errors){
    req.flash('error_msg', 'Project Title Required!');
    res.redirect('/user/project/search');
  } else {
    db.Projects.findAll(query).then(projects => {
      res.render('search', projects);
    }).catch(err => {
      res.render('error',err);
    })
  }
});


////////////////////// project page //////////////////////////////

// load  project form page
router.get('/project/form', (req,res) => {
  res.render('add-project');
});

//  add project
router.post('/project/new/:userid', (req,res) => {
  let errors;
  let newProject = {};


  // Validate
  req.checkBody('subject', 'Title is required').notEmpty();
  req.checkBody('description', 'Description is required').notEmpty();

  errors = req.validationErrors();


  if(errors){

    res.render('add-project',{errors:errors});

  } else {
    newProject.UserId = req.params.userid;
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
router.get('/project/open/:projid', (req,res) => {
  let projId = req.params.projid;

  let query = {
    where:{id: projId}, attributes:['id','subject','description','UserId'],
    include: [
      {model: db.Comments, attributes:['id','body','ProjectId'],
        include:[{model: db.Users, attributes: ['id','username']}]},
      {model: db.Proposals, attributes:['id','subject','body','ProjectId'],
        include:[{model: db.Users, attributes:['id','username']},
          {model: db.Votes, attributes: ['id','vote']}]},

    ]
  };

  db.Projects.findOne(query).then(regProject => {
    let project = regProject.dataValues;

    res.render('project',project);
  }).catch(err => {
    res.render('error',err);
  });

});

// list all projects
router.get('/project/all', (req,res) =>{
  let query = {
    where:{},
    include:[db.Users]
  };

  db.Projects.findAll(query).then(allProjects => {
    res.render('all-projects', allProjects);
  }).catch(err => {
    res.render('error', err);
  })

});

////////////////////////////////////////////////////////////////////

module.exports = router;
