const express     = require('express'),
    router      = express.Router(),
    db          = require('../models'),
    expressVal  = require('express-validator');




// testing route file
router.get('/userhome', (req,res) => {
res.render('user-home');
});

router.get('/add-project', (req,res) => {
 res.render('add-project');
});

router.post('/test' ,(req,res)=>{
//res.render('/test');
console.log(req.body);
});

router.get('/search', (req,res) => {
 res.render('search');
});

module.exports = router;