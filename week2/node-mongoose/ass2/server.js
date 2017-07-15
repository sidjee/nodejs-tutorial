var assert = require('assert');
var mongoose = require('mongoose');
var Dishes = require('./ass2/models/dishes.js');

var url="mongodb://localhost:27017/conFusion";
mongoose.connect(url);

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));

db.once('open',function () {
	// body...
	Dishes.create({
		name:"Bahubali 2",
		description: "test",
		comments:[{
			rating: 2,
			description:"Climax Ruined",
			author:"Siddharth Jain"
		}],
		image:"/bahubali.png",
		category:"movies",
		price:"$39,000,000.00"
	},function (err, dish) {
		// body...
		if(err) throw err;

		console.log('Dish created: ');
		console.log(dish);

		var id = dish._id;

		setTimeout(
			function () {
				// body...
				Dishes.findByIdAndUpdate(id,{$set:{description:"Update test",label:"hello"}},{ new : true})
				.exec(function (err,dish) {
					// body...
					if(err) throw err;

					console.log('Updated dish: ');
					console.log(dish);

					dish.comments.push({
						rating: 5,
						description: "MAst hai",
						author: "Vishwas"
					});
					dish.save(function (err,dish) {
						// body...
						console.log('Updated comments : ');
						console.log(dish);

						Dishes.find({},function (err,result) {
							// body...
							if(err) throw err;
							console.log('After find operation : ');
							console.log(result);

							db.collection('dishes').drop(function (err) {
								// body...
								if(err) throw err;
								db.close();
							});
						});

					});

				});
			},3000);
	});
});