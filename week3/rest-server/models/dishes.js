var mongoose = require('mongoose');
	Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;
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
	image:{
		type:String,
		unique: true
	},
	category:{
		type:String,
		required: true
	},
	label:{
		type:String,
		default:" ",
		required: true
	},
	price:{
		type:Currency,
		required: true
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