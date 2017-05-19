'use strict';

const express     = require('express'),
      router      = express.Router(),
      db          = require('../models');



/* GET user profile page */
router.get('/dashboard/:id', (req,res)=> {
  res.render('dashboard');
});

function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/login');
    }

module.exports = router;

