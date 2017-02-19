var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var page = require('../models/page.js');
var admin = require('../models/admin.js');

/*User Routes*/

router.get('/', function(request, response){
	response.send("Welcome!");
});

router.get('/pages', function(request, response){
	return page.find(function(error, pages){
		if(error){
			response.send(500, error);
		}
		else{
			return response.send(pages);
		}
	});
});

module.exports = router;