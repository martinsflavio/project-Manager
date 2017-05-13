const express = require('express'),
      router = express.Router();

/* GET user profile page */
router.get('/profile', (rep,res)=> {
  res.render('profile',{title:'Profile Page', body:'Successfully Logged'});
});


module.exports = router;