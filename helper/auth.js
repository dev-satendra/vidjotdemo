var auth = exports = module.exports = {};

auth.ensureAuthentication = function (req, res, next) {
	if(req.isAuthenticated()){
		next();
	}else{
		req.flash('error_msg', 'Unauthrized access');
		res.redirect('/user/login');
	}
}