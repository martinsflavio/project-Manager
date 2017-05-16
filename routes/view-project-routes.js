const express     = require('express'),
      router      = express.Router(),
      db          = require('../models'),
      expressVal  = require('express-validator');



/* GET all the projects in a specific zip code */
router.get('/all/:zip', (req,res) => {
  let userZipCode = req.params.zip;

  db.Projects.findAll({where:{zip_code:userZipCode}}).then( project => {

    //testing route
    res.json(project);

  }).catch( error => {
    res.render('error', error);
  });
});


module.exports = router;