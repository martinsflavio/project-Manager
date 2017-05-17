'use strict';

const express     = require('express'),
    router      = express.Router(),
    db          = require('../models');




// testing route file
router.get('/userhome', (req,res) => {
res.render('user-home');
});

router.get('/add-project', (req,res) => {
 res.render('add-project');
});



router.get('/search', (req,res) => {
 res.render('search');
});

module.exports = router;