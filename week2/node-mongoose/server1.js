var assert = require('assert');
var mongoose = require('mongoose');
var Dishes = require('./models/dishes1.js');

var url="mongodb://localhost:27017/conFusion";
mongoose.connect(url);

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));

db.once('open',function(){
	console.log('connected securely to the server');

	var newDish = Dishes({
		name:"Bahubali",
		description:"kattapa"
	});

	newDish.save(function (err) {
		// body...
		assert.equal(err,null);

		console.log('Dish created');

		Dishes.find({},function (err,dishes) {
			// body...
			assert.equal(err,null);
			console.log(dishes);
			db.collection('dishes').drop(function () {
				// body...
				db.close();
			});
		});
	});
});