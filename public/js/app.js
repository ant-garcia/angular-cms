'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
	'ngRoute',
	'myApp.filters',
	'myApp.services',
	'myApp.directives',
	'myApp.controllers'
])
	.config(['$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider) {
			$routeProvider.when('/user/login', {
				templateUrl: 'partials/user/login.html',
				controller: 'userLoginController'
			});
			$routeProvider.when('/user/pages', {
				templateUrl: 'partials/user/pages.html',
				controller: 'userPagesController'
			});
			$routeProvider.when('/user/add-edit-page/:id', {
				templateUrl: 'partials/user/add-edit-page.html',
				controller: 'addEditPageController'
			});
			$locationProvider.html5Mode(true);
		},
	]);