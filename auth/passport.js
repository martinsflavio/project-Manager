const passport      = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      db            = require('../models');






passport.use(new LocalStrategy(
    (username, password, done) => {
      db.Users.getUserByUsername(username, user => {

        if(!user){
          return done(null, false, {message: 'Unknown User'});
        }

        db.Users.comparePassword(password, user.password, (err,isMatch) => {
          if (err) {return done(err);}

          if(isMatch){
            return done(null, user);
          } else {
            return done(null, false, {message: 'Invalid password'});
          }
        });
      });
    }));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {

  db.Users.getUserById(id, user => {

    if (user) {
      done(null, user.get());
    } else {
      done(user.errors, null);
    }
  });
});

passport.ensureAuthenticated = (req, res, next) =>{
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('error_msg','You are not logged in');
    res.redirect('/login');
  }
}


module.exports = passport;