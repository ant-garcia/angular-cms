'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
	'ngRoute',
	'myApp.filters',
	'myApp.services',
	'myApp.directives',
	'myApp.controllers',
	'ui.tinymce',
	'ngCookies',
	'message.flash'
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
			$routeProvider.when('/:url', {
				templateUrl: 'partials/page.html',
				controller: 'pageController'
			})
			$routeProvider.otherwise({
				redirectTo: '/home'
			});
			$locationProvider.html5Mode(true);
		},
	])
	.config(function($httpProvider){
		$httpProvider.interceptors.push('myHttpInterceptor');
	});