const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('../models/user');
const userModel = mongoose.model('users');

module.exports = function(passport){
	passport.use(new localStrategy({ usernameField : 'email'}, (email, password, done) => {
		userModel.findOne({email : email}).then( user => {
			if(!user){
				return done(null, false, {message : 'No user found'});
			}
			bcrypt.compare(password, user.password, (err, isMatch) => {
				if(err) throw err;
				if(isMatch){
					return done(null, user);
				}else{
					return done(null, false, {message : 'password mismatch'});
				}
			})
		})
	}));
	passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  userModel.findById(id, function(err, user) {
	    done(err, user);
	  });
	});
}