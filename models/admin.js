var mongoose = require('mongoose');
var schema = mongoose.Schema;
var admin = new schema({
	username: String,
	password: String
});

var admin = mongoose.model('admin', admin);
module.exports = admin;