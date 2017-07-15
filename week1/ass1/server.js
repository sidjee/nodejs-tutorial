var router = require('./module.js');

var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyparser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

app.use(bodyparser.json());
app.use(morgan('dev'));


app.use('/leaders',router('leader'));
app.use('/promotions',router('promotion'));

app.use(express.static(__dirname+'/public'));

app.listen(port,hostname,function () {
	// body...
	console.log('server running');
});