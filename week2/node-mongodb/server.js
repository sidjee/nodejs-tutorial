var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');
var module = require('./module.js');

var url = "mongodb://localhost:27017/conFusion";

MongoClient.connect(url, function (err,db) {
	// body...
	assert.equal(err,null);
	console.log('Connected to the server!');
	module.insertDocument(db,{name:"hello",description:"test"},"dishes",function (result) {
		// body...
		console.log(result.ops);
		module.updateDocument(db,{name:"hello"},{description:"update test"},"dishes",function (result) {
			// body...
			console.log(result.result);

			module.findDocument(db,"dishes",function (result) {
				// body...
				console.log(result);

				module.remove(db,{name:"hello"},"dishes",function (result) {
					// body...
					console.log(result.ops);
					db.close();
				});
			});
		});
	});
});