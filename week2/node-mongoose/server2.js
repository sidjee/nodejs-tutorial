var assert = require('assert');
var mongoose = require('mongoose');
var Dishes = require('./models/dishes1.js');

var url="mongodb://localhost:27017/conFusion";
mongoose.connect(url);

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));

db.once('open',function () {
	// body...
	Dishes.create({
		name:"Bahubali 2",
		description: "test"
	},function (err, dish) {
		// body...
		if(err) throw err;

		console.log('Dish created: ');
		console.log(dish);

		var id = dish._id;

		setTimeout(
			function () {
				// body...
				Dishes.findByIdAndUpdate(id,{$set:{description:"Update test"}},{ new : true})
				.exec(function (err,dish) {
					// body...
					if(err) throw err;
					console.log('Updated dish: ');
					console.log(dish);
					db.collection('dishes').drop(function (err) {
						// body...
						if(err) throw err;
						db.close();
					});
				});
			},3000);
	});
});