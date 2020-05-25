const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');


passport.use(new LocalStrategy( 
    
    { usernameField: 'email' 

    },

    function (email, password, done) {

        User.findOne({ emailId: email }, function (err, user) {

            if (err) return done(err);

            if (!user)
                return done(null, false, {
                    message: 'Incorrect EmailId'
                });

            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return done(null, user);
        });

   

}

));
    