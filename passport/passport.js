var bCrypt = require('bcrypt-nodejs');
var passport = require('passport');
var flash = require("connect-flash");


module.exports = function(passport, user) {
 
	var User = user;
	var LocalStrategy = require('passport-local').Strategy;

	passport.use('local-signup', new LocalStrategy( 
        {           
        passReqToCallback : true // allows us to pass back the entire request to the callback
        },

        function(req, username, password, done) {

		var generateHash = function(password) {
	    	return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
	    };

    	User.findOne({where: {username: username}}).then(function(user) {
        	if (user) {
                console.log('That username is already taken.');
          		return done(null, false, {message: 'That username is already taken.'});
            } else {
                var userPassword = generateHash(password);
                var data =
                        {
                        username: username,
                        password: userPassword,
                        zip_code: req.body.zip_code
                    	};
                        console.log(data);
                User.create(data).then(function(newUser, created) {
                	if (!newUser) {
                		return done(null, false);
                    }
                    if (newUser) {
                        console.log(newUser);
                    	return done(null, newUser);
                    }
                });
        	}
            
            });
        }
    ));

    //LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy(
        {
        passReqToCallback: true // allows us to pass back the entire request to the callback
        },
 
        function(req, username, password, done) {
 
            var User = user;
            var isValidPassword = function(userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }
            User.findOne({where: {username: username}}).then(function(user) {
                if (!user) {
                    console.log('username does not exist');
                    return done(null, false, {message: 'Username does not exist'});
                }
     
                if (!isValidPassword(user.password, password)) {
                    console.log('incorrect password');
                    return done(null, false, {message: 'Incorrect password.'});
                }
     
                var userinfo = user.get();
                console.log("this is userinfo" + userinfo);
                return done(null, userinfo);
            }).catch(function(err) {
                console.log("Error:", err);
                return done(null, false, {message: 'Something went wrong with your login'});
            });
        }
    ));
	



		//serialize User
	passport.serializeUser(function(user, done) {
  		done(null, user.id);
	});

	// deserialize user 
    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user) {
        if (user) {
            done(null, user.get());
        } else {
            done(user.errors, null);
        }
    });
 
});

}