'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
	.controller('userPagesController', ['$scope', '$log', 'pagesFactory',
		function($scope, $log, pagesFactory){
			pagesFactory.getPages().then(
			function(response){
				$scope.allPages = response.data;
			},
			function(error){
				$log.error(error);
			});

			$scope.deletePage = function(id){
				pagesFactory.deletePage(id);
			};
		}])
	.controller('userLoginController', ['$scope', '$location', '$cookies', 'AuthService', 'flashMessageService',
		function($scope, $location, $cookies, AuthService, flashMessageService){
			$scope.credentials = {
				username: '',
				password: ''
			};
			$scope.login = function(credentials){
				AuthService.login(credentials).then(
					function(response, error){
						$cookies.loggedInUser = response.data;
						$location.path('/user/pages');
					},
					function(error){
						flashMessageService.setMessage(error.data);
						console.log(error);
					});
			};
		}])
	.controller('addEditPageController', ['$scope', '$log', 'pagesFactory', '$routeParams', '$location', 'flashMessageService',
		'$filter', function($scope, $log, pagesFactory, $routeParams, $location, flashMessageService, $filter){
			$scope.pageContent = {};
			$scope.pageContent._id = $routeParams.id;
			$scope.heading = 'Add a New Page';

			if($scope.pageContent._id !== 0){
				$scope.heading = 'Update Page';
				pagesFactory.getUserPageContent($scope.pageContent._id).then(
					function(response){
						$scope.pageContent = response.data;
						$log.info($scope.pageContent);
					},
					function(error){
						$log.error(error);
					});
			}

			$scope.savePage = function(){
				pagesFactory.savePage($scope.pageContent).then(
					function(){
						flashMessageService.setMessage('Successfully Page Saved');
						$location.path('/user/pages');
					},
					function(){
						$log.error('error occured while saving data');
					});
			};

			$scope.updateURL = function(){
				$scope.pageContent.url = $filter('formatURL')($scope.pageContent.title);
			};
		}])
	.controller('appController', ['$scope', 'AuthService', 'flashMessageService', '$location',
		function($scope, AuthService, flashMessageService, location){
			$scope.site = {
				logo: 'img/angular-cms-logo.ico',
				footer: 'Copyright 2017 Angular CMS'
			};
			$scope.logout = function(){
				AuthService.logout().then(
					function(){
						$location.path('/user/login');
						flashMessageService.setMessage('Log Out Successful');
					},
					function(error){
						console.log('An error occured while trying to log out');
					});
			};
		}])
	.controller('pageController', ['$scope', 'pagesFactory', '$routeParams', '$sce',
		function($scope, pagesFactory, $routeParams, $sce){
			var url = $routeParams.url;

			if(!url)
				url = 'home';

			pagesFactory.getPageContent(url).then(
				function(response){
					$scope.pageContent = {};
					$scope.pageContent.title = response.data.title;
					$scope.pageContent.content = $sce.trustAsHtml(response.data.content);
				},
				function(){
					console.log('An error has occured while fetching data')
				});
		}]);