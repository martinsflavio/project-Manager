'use strict';

const express     = require('express'),
      router      = express.Router(),
      db          = require('../models');


/////////////////// proposal forms ///////////////////////////////
router.post('/proposal/new/:userid/:projid', (req,res) => {
  let errors;
  let newProposal = {};

  // Validate
  req.checkBody('subject', 'Title is required').notEmpty();
  req.checkBody('body', 'Description is required').notEmpty();

  errors = req.validationErrors();


  if(errors){
      res.render('project');

  } else {
    newProposal.subject     = req.body.subject;
    newProposal.body        = req.body.body;
    newProposal.UserId      = req.params.userid;
    newProposal.ProjectId   = req.params.projid;


    db.Proposals.create(newProposal).then(regProposal => {
      let projId = regProposal.dataValues.ProjectId;
      res.redirect(`/user/project/open/${projId}`);
    }).catch(err => {
      res.render('error',err);
    });

  }




});

//////////////////// vote button //////////////////////////////
router.post('/proposal/vote/:vote/:userid/:propid/:projid', (req,res)=> {
  let vote, query;

  vote = {
    vote       : req.params.vote,
    UserId     : req.params.userid,
    ProposalId : req.params.propid,
    ProjectId  : req.params.projid
  };

  query = {
    defaults: vote,
    where: {
      UserId    :vote.UserId,
      ProposalId:vote.ProposalId,
      ProjectId :vote.ProjectId
    }
  };

  db.Votes.findOrCreate(query).then(regVote => {
    let projId = regVote[0].dataValues.ProjectId;

    res.redirect(`/user/project/open/${projId}`);

  }).catch(err => {
    res.render('error',err);
  });

});

module.exports = router;