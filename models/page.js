var mongoose = require('mongoose');
var schema = mongoose.Schema;
var page = new schema({
	title: String,
	url: {type: String, index: {unique: true}},
	content: String,
	menuIndex: Number,
	data: Date 
});

var page = mongoose.model('page', page);
module.exports = page;