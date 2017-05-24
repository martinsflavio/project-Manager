'use strict';

const express     = require('express'),
    router      = express.Router(),
    db          = require('../models');


/////////////////// proposal forms ///////////////////////////////
//(TODO) IMPLEMENT SOCKET.OI FOR REAL TIME FEEDBACK

router.post('/comment/new/:userid/:projid', (req,res) => {
  let errors;
  let newComment = {};

  // Validate
  req.checkBody('body', 'Description is required').notEmpty();

  errors = req.validationErrors();

  if(errors){
    res.render('project',{msg:errors});
  } else {

    newComment.body       = req.body.body;
    newComment.ProjectId  = req.params.projid;
    newComment.UserId     = req.params.userid;

    console.log(newComment);

    db.Comments.create(newComment).then(regComment => {
      let projId = regComment.dataValues.ProjectId;

     res.redirect(`/user/project/open/${projId}`);
    }).catch(err => {
      res.render('error',err);
    });

  }

});

module.exports = router;