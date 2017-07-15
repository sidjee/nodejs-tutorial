var express= require('express');
var app = express();
var port=3000;
var hostname = 'localhost';
var morgan = require('morgan');
var session = require('express-session');
var fileStore = require('session-file-store')(session);
//var cookieParser = require('cookie-parser');

app.use(morgan('dev'));
app.use(session({
	name:'session-id',
	secret:'12345-56789-67890-34466-32132',
	saveUninitialized: true,
	resave: true,
	store: new fileStore()
}));

function auth(req,res,next) {
	// body...
	console.log(req.headers);
	if(!req.session.user){
		var authHeader= req.headers.authorization;
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
			/*Ye line nhi pata kya matlab hai 
			res ki jagah req kyu h pata nhi*/
			req.session.user = 'admin';								//Please someone explain me this line...
			next();
		}
		else{
			var err = new Error('You are not authorized');
			err.status = 401;
			next(err);
		}
	}
	else{
		if (req.session.user==='admin') {
			console.log('req.session : ',req.session);
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