var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var page = require('../models/page.js');
var admin = require('../models/admin.js');

/*User Routes*/

router.get('/', function(request, response){
	response.send("Welcome!");
});

router.get('/pages', function(request, response){
	return page.find(function(error, pages){
		if(error)
			response.send(500, error);
		else
			return response.send(pages);
	});
});

router.post('/pages/add', sessionCheck, function(request, response){
	var page = new Page({
		title: request.body.title,
		url: request.body.url,
		content: request.body.content,
		menuIndex: request.body.menuIndex,
		date: new Date(Date.now())
	});

	page.save(function(error){
		if(error)
			return response.send(500, error);
		else
			return response.send(200, page);
	});
});

router.post('/pages/update', sessionCheck, function(request, response){
	var id = request.body._id;

	page.update({
		_id: id
	}, {
		$set: {
			title: request.body.title,
			url: request.body.url,
			content: request.body.content,
			menuIndex: request.body.menuIndex,
			date: new Date(Date.now())
		}
	}).exec();

	response.send("Page updated");
});

router.get('/pages/delete/:id', sessionCheck, function(request, response){
	var id = request.params.id;

	page.remove({
		_id: id
	}, function(error){
		return console.log(error);
	});

	return response.send('Page id: ' + id + ' has been deleted');
});

router.get('/pages/admin/:id', sessionCheck, function(request, response){
	var id = request.params.id;

	page.findOne({
		_id: id
	}, function(error, page){
		if(error)
			return console.log(error);

		return response.send(page);
	});
});

router.get('/pages/details/:url', sessionCheck, function(request, response){
	var url = request.params.url;

	page.findOne({
		url: url
	}, function(error, page){
		if(error)
			return console.log(error);

		return response.send(page);
	});
});

router.post('/addUser', function(request, response){
	var password = request.body.password;
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(password, salt);
	var admin = new Admin({
		username: request.body.username,
		password: hash
	});

	admin.save(function(error){
		if(error)
			return response.send(error);
		else
			return response.send('Admin created successfully');
	});
});

router.post('/login', function(request, response){
	var username = request.body.username;
	var password = request.body.password;

	admin.findOne({
		username: username
	}, function(error, data){
		if(error | data === null)
			return response.send(401, 'User does not exist');
		else{
			var user = data;

			if(username == user.username && bcrypt.compareSync(password, user.password)){
				request.session.regenerate(function(){
					request.session.user = username;
					return response.send(username);
				});
			}
			else
				return response.send(401, 'Bad username or password');
		}
	});
});

router.get('/logout', function(request, response){
	request.session.destroy(function(){
		return response.send(401, 'User logged out');
	});
});

function sessionCheck(request, response, next){
	if(request.session.user)
		next();
	else
		response.send(401, 'Authorization failed');
}

module.exports = router;