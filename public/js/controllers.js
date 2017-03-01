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
				pagesFactory.getAdminPageContent($scope.pageContent._id).then(
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
		}]);