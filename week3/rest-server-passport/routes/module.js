module.exports = function (str) {
	// body...

var express = require('express');

var router = express.Router();
var verify = require('./verify.js');
var mongoose = require('mongoose');
var obj = require('../models/dishes.js');
mongoose.Promise = require('bluebird');
router.route('/')

.get(verify.verifyOrdinaryUser,function (req,res,next) {
	obj.find({},function (err,resp) {
		// body...
		if(err) throw err;
		res.json(resp);
	});
})

.post(verify.verifyOrdinaryUser,function (req,res,next) {
	obj.create(req.body,function (err,resp) {
		if(err) throw err;
		console.log('Dish created');

		var id = resp._id;
		res.writeHead(200,{'Content-Type':'text/html'});	
		res.end('Dish created of id '+id);

	});
})

.delete(verify.verifyOrdinaryUser,function (req,res,next) {
	obj.remove({},function (err,resp) {
		// body...
		if (err) throw err;
		res.json(resp);
	});
});

router.route('/:dishid')

.put(verify.verifyOrdinaryUser,function (req,res,next) {
	obj.findByIdAndUpdate(req.params.dishid,{$set:req.body},{
		new:true
	},function (err,resp) {
		// body...
		if (err) {throw err;}

		res.json(resp);
	});
})

.get(verify.verifyOrdinaryUser,function (req,res,next) {
	obj.findById(req.params.dishid,function (err,resp) {
		// body...
		if(err) throw err;

		res.json(resp);
	});
})

.delete(verify.verifyOrdinaryUser,function (req,res,next) {
	findByIdAndRemove(req.params.dishid,function (err,resp) {
		// body...
		if (err) {throw err;}
		res.json(resp);
	});
});

router.route('/:dishid/comments')

.get(verify.verifyOrdinaryUser,function (req,res,next) {
	// body...
	obj.findById(req.params.dishid,function (err,dish) {
		// body...
		if(err) throw err;
		res.json(dish.comments);
	});
})

.post(verify.verifyOrdinaryUser,function (req,res,next) {
	// body...
	obj.findById(req.params.dishid,function (err,dish) {
		// body...
		if(err) throw err;

		dish.comments.push(req.body);
		dish.save(function (err,resp) {
			// body...
			if(err) throw err;
			console.log('Updated comments');
			res.json(resp);
		});
	});
})

.delete(verify.verifyOrdinaryUser,function (req,res,next) {
	// body...
	obj.findById(req.params.dishid,function (err,dish) {
		// body...
		if(err) throw err;

		for (var i = dish.comments.length - 1; i >= 0; i--) {
			dish.comments.id(dish.comments[i]._id).remove();

		}
		dish.save(function (err,result) {
			// body...
			if (err) {throw err;}

			res.writeHead(200,{'Content-Type':'text/html'});
			res.end('Deleted all comments');	
		});
		
	});
})

router.route('/:dishid/comments/:commentid')
.get(verify.verifyOrdinaryUser,function (req,res,next) {
	obj.findById(req.params.dishid,function (err,dish) {
		// body...
		if (err) {throw err;}

		res.json(dish.comments.id(req.params.commentid));
	});
})

.put(verify.verifyOrdinaryUser,function (req,res,next) {
	obj.findById(req.params.dishid,function (err,dish) {
		// body...
		if (err) {throw err;}

		dish.comments.id(req.params.commentid).remove();

		dish.comments.push(req.body);
		dish.save(function (err,result) {
			// body...
			if (err) {throw err;}
			console.log('Updated comments');
			res.json(result);
		});
	});
})


.delete(verify.verifyOrdinaryUser,function (req, res, next) {
    obj.findById(req.params.dishid, function (err, dish) {
        dish.comments.id(req.params.commentid).remove();
        dish.save(function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});
return router;
}