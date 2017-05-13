const express     = require('express'),
      router      = express.Router(),
      db          = require('../models'),
      expressVal  = require('express-validator');



/* Create new Project */
router.get('/project', (req,res) => {
  db.Projects.findAll().then( project => {

    //testing route
    res.json(project);

  }).catch( error => {
    res.render('error', error);
  });
});


module.exports = router;