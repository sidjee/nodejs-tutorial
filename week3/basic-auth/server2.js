var express= require('express');
var app = express();
var port=3000;
var hostname = 'localhost';
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

app.use(morgan('dev'));
app.use(cookieParser('54253-21222-42331-21212-24561'));

function auth(req,res,next) {
	// body...
	console.log(req.headers);
	var authHeader= req.headers.authorization;
	if(!req.signedCookies.user){
		if(!authHeader){
			var err = new Error('You are not authorized');
			err.status=401;
			next(err);
			return;
		}
	
		var auth = new Buffer(authHeader.split(' ')[1],'base64').toString().split(':');
		var user = auth[0];
		var pass = auth[1];

		if(user=="admin"&&pass=="password"){
			res.cookie('user','admin',{signed:true});
			next();
		}
		else{
			var err = new Error('You are not authorized');
			err.status = 401;
			next(err);
		}
	}
	else{
		if (req.signedCookies.user==='admin') {
			next();
		} 
		else {
			var err = new Error('You are not authorized');
			err.status = 401;
			next(err);
		}
	}
}

app.use(auth);
app.use(express.static(__dirname+'/public'));

app.use(function (err,req,res,next) {
	// body...
	res.writeHead(err.status||500,{
		'WWW-Authenticate':'Basic',
		'Content-Type':'text/html'
	});
	res.end(err.message);
});

app.listen(port,hostname,function () {
	// body...
	console.log('Connected to the server');
});