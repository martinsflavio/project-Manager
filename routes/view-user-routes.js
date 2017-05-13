const express = require('express'),
      db      = require('../models'),
      router  = express.Router();

/* GET user profile page */
router.get('/profile', (rep,res)=> {
  let userZipcode = 94015;
  // (TODO) filter by zip code
  db.Projects.findAll({where: {zip_code:userZipcode}}).then( projects => {
    res.render('profile',{title:'Profile Page', body:'Successfully Logged', projectsList: projects});
  }).catch( error => {
    res.render('error', error);
  });

});


module.exports = router;