const express     = require('express'),
    router      = express.Router(),
    db          = require('../models'),
    expressVal  = require('express-validator');




// testing route file
router.get('/test', (req,res) => {
  console.log('route ok');
});




module.exports = router;