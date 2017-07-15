var mongoose = require('mongoose');
	Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var promoSchema = new Schema({
	name:{
		type: String,
		required: true,
		unique: true
	},
	image:{
		type:String,
		unique: true
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
	}},
	{
	timestamps: true
});

var Promotions = mongoose.model('Promotion',promoSchema);

module.exports = Promotions;