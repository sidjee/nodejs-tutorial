var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user.js');
var Verify = require('./verify');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',function (req,res) {
	// body...
	User.register(new User({username : req.body.username}), req.body.password, function (err,user) {
		// body...
		if(err)
			return res.status(500).json({err:err});

		passport.authenticate('local')(req,res,function (argument) {
			// body...
			return res.status(200).json({status:"Registration successful!"});
		});
	});
});

router.post('/login',function (req,res,next) {
	// body...
	passport.authenticate('local',function (err,user,info) {
		// body...
		if(err)
			return next(err);

		if(!user){
			return res.status(401).json({
				err : info
			});
		}

		req.logIn(user,function (err) {
			// body...
			if(err)
				return res.status(500).json({
					err : 'could not login user'
				});

			var Token = Verify.getToken(user);
			res.status(200).json({
				status : 'Login Successful',
				success: true,
				token: Token
			});
		});
	})(req,res,next);
});

router.get('/logout',function (req,res) {
	// body...
	req.logout();
	res.status(200).json({
		status : 'Bye!'
	});
});

module.exports = router;
