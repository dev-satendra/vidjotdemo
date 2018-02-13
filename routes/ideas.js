const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

require('../models/idea');
const auth = require('../helper/auth');
const Idea = mongoose.model('idea');

router.get('/add', auth.ensureAuthentication, (req,res) => {
	res.render('ideas/add');
});
router.get('/edit/:id', auth.ensureAuthentication, (req,res) => {
	Idea.findOne({_id : req.params.id}).then(idea => {
		res.render('ideas/editIdeas',{
			idea : idea,
			title : idea.title,
			description : idea.description
		})
	});
});
router.post('/', auth.ensureAuthentication, (req,res) => {
	var errors = [];
	if(!req.body.title)
		errors.push({ error : 'Please enter the title' });
	if(!req.body.description)
		errors.push({error : 'Please enter the description'});
	if(errors.length > 0){
		req.flash('error_msg' , errors);
		res.render('ideas/index', {
			title : req.body.title,
			description : req.body.description
		})
	}
	else{
		const newIdea = {
			title : req.body.title,
			description : req.body.description,
			userId : req.user.id
		};
		new Idea(newIdea)
		.save().then(idea => {
			req.flash('success_msg' , 'Idea Added');
			res.redirect('/ideas');
		});
	}

});
router.put('/:id', auth.ensureAuthentication, (req,res) => {
	Idea.findOne({_id : req.params.id}).then( idea => {
		idea.title  = req.body.title;
		idea.description = req.body.description;
		idea.save().then( idea => { 
			req.flash('success_msg' , 'Idea edited');
			res.redirect('/ideas');
		})
	});
});
router.delete('/:id', auth.ensureAuthentication, (req,res) => {
	Idea.remove({_id : req.params.id}).then( idea => {
		req.flash('success_msg' , 'Idea deleted');
		res.redirect('/ideas');
	});
});
router.get('/', auth.ensureAuthentication, (req,res) => {
	Idea.find({userId: req.user.id}).sort({ date : 'desc'}).then(ideas => {
		res.render('ideas/index',{
			ideas : ideas
		});
	});
});

module.exports = router;