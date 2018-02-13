const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

require('../models/user');
const userModel = mongoose.model('users');

router.get('/login', (req,res) => {
	res.render("user/login");
});
router.get('/register', (req,res) => {
	res.render("user/register");
});
router.post('/register', (req,res) => {
	var errors = [];
	if(!req.body.name){
		errors.push({ error : 'name must be required'});
	}
	if(!req.body.email){
		errors.push({ error : 'email must be required'});
	}
	if(req.body.password.length < 4){
		errors.push({ error : 'password must be required and greater than 4 char'});
	}
	if(req.body.password2 !== req.body.password){
		errors.push({ error : 'password didn\'t match' });
	}
	if(errors.length > 0){
		req.flash('errors', errors);
		res.render('user/register',{
			name : req.body.name,
			email : req.body.email,
			password : req.body.password,
			password2 : req.body.password2,
		})
	}
	else{
		userModel.findOne({email:req.body.email}).then(user => {
			if(user){
				req.flash('error_msg', 'user already exist');
				res.redirect('/user/register');
			}else{
				bcrypt.genSalt(10, function(err, salt) {
				    bcrypt.hash(req.body.password, salt, function(err, hash) {
				        new userModel({
							name : req.body.name,
							email : req.body.email,
							password : hash
						}).save().then(  user => {
							req.flash('success_msg', 'You are registerted');
							res.redirect('/user/login');
						})
				    });
				});
			}
		})		
	}

});
router.post('/login', (req,res, next) => {
	passport.authenticate('local', {
		successRedirect : '/ideas',
		failureRedirect : '/user/login',
		failureFlash : true,
	})(req,res,next);
});
router.get('/logout', (req,res) => {
	req.logout();
	req.flash('success_msg', 'You have logged out');
	res.redirect('/user/login');
})
module.exports = router;