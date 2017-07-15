var assert = require('assert');
exports.insertDocument= function (db, document, collection, callback) {
	// body...
	var coll = db.collection(collection);

	coll.insert(document,function (err,result) {
		// body...
		assert.equal(err,null);
		console.log('Inserted '+result.result.n+' docs into the collection '+collection);
		callback(result);
	});
};

exports.findDocument = function (db,collection,callback) {
	// body...
	var coll = db.collection(collection);
	coll.find({}).toArray(function (err,result) {
		// body...
		assert.equal(err,null);
		callback(result);
	});
};

exports.remove = function (db,document,collection,callback) {
	// body...
	var coll = db.collection(collection);
	coll.deleteOne(document,function (err,result) {
		// body...
		assert.equal(err,null);
		console.log('Deleted document '+document);
		callback(result);
	});
};

exports.updateDocument = function (db,document,updatedoc,collection,callback) {
	// body...
	var coll = db.collection(collection);
	coll.updateOne(document,{$set : updatedoc}, null, function (err,result) {
		// body...
		assert.equal(err,null);
		console.log('Updated document: '+result);
		callback(result);
	});
};