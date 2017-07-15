var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

var url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url,function (err,db) {
	// body...
	assert.equal(err,null);
	console.log('Connected correctly to the server');
	var collection = db.collection("dishes");
	collection.insertOne({name:"yoyo",description:"honeysingh"},function (err,result) {
		// body...
		assert.equal(err,null);
		console.log('After insert:');
		console.log(result.ops);
		collection.find({}).toArray(function (err,docs) {
			// body...
			assert.equal(err,null);
			console.log('Found');
			console.log(docs);
			db.dropCollection("dishes",function (err,result1) {
				// body...
				assert.equal(err,null);
				db.close();
			});
		});
	});
});