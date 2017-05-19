const db = require('../models');


// initialize db
db.sequelize.sync({force:true}).then(function() {
  console.log('Done, DB Restarted');
  db.sequelize.close();
});

