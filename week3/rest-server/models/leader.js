var mongoose = require('mongoose');
	Schema = mongoose.Schema;

var leaderSchema = new Schema({
	name:{
		type: String,
		required: true,
		unique: true
	},
	image:{
		type:String,
		unique: true
	},
	designation:{
		type:String,
		required: true
	},
	abbr:String,
	description:{
		type: String,
		required: true
	}},
	{
	timestamps: true
});

var Leaders = mongoose.model('Leader',leaderSchema);

module.exports = Leaders;