var User = require('../models/user.js');
var jwt = require('jsonwebtoken');
var config = require('../config.js');

exports.getToken = function(user) {
	// body...
	return jwt.sign(user,config.secretKey,{expiresIn : 3600});
};

exports.verifyOrdinaryUser = function (req,res,next) {
	// body...
	var token = req.body.token||req.query.token||req.headers['x-access-token'];
	if(token){
		jwt.verify(token,config.secretKey, function (err,decoded) {
			// body...
			if(err){
				var error = new Error('You are not authenticated');
				error.status = 401;
				return next(error);
			}
			req.decoded = decoded;
			next();
		});
	}
	else{
		var err = new Error('No token provided');
		err.status = 403;
		return next(err);
	}
};