'use strict';

const express     = require('express'),
      router      = express.Router(),
      db          = require('../models');



/* GET user profile page */
router.get('/dashboard', (req,res)=> {
  res.render('dashboard');
  console.log(req.params.id);


});

module.exports = router;

