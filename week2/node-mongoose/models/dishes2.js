var mongoose = require('mongoose');
	Schema = mongoose.Schema;

var commentSchema = new Schema({
	rating:{
		type:Number,
		required:true,
		min: 1,
		max: 5
	},
	description:{
		type: String,
		required: false,
	},
	author:{
		type: String,
		required: true
	}
},{timestamps: true});

var dishSchema = new Schema({
	name:{
		type: String,
		required: true,
		unique: true
	},
	description:{
		type: String,
		required: true
	},
	comments:[commentSchema]
},{
	timestamps: true
});

var Dishes = mongoose.model('Dish',dishSchema);

module.exports = Dishes;