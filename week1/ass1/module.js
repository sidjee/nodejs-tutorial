module.exports = function (str) {
	// body...

var express = require('express');

var router = express.Router();
router.route('/')
.all(function (req,res,next) {
	// body...
	res.writeHead(200,{'Content-Type':'text/html'});
	next();
})

.get(function (req,res,next) {
	// body...
	res.end('<h1>Will send u all '+str+'s</h1>');
})

.post(function (req,res,next) {
	// body...
	res.end('<h1>Will add '+str+' '+req.body.name+' to the collection</h1>');
})

.delete(function (req,res,next) {
	// body...
	res.end('<h1>Will delete all '+str+'s</h1>');
});

router.route('/:leaderid')

.all(function (req,res,next) {
	// body...
	res.writeHead(200,{'Content-Type':'text/html'});
	next();
})

.put(function (req,res,next) {
	// body...
	res.end('<h1>U have to change description of '+req.params.leaderid+'</h1>'+	
		'<h2>Description of '+req.body.name+' is changeed to '+req.body.description+'</h2>');
})

.get(function (req,res,next) {
	// body...
	res.end('<h1>Will give u details of '+str+' :'+req.params.dishid+'</h1>');
})

.delete(function (req,res,next) {
	// body...
	res.end('<h1>Will delete '+str+' of id '+req.params.dishid+'</h1>');
});
return router;
}