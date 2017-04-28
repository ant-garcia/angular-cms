'use strict';

/* Directives */

angular.module('myApp.directives', [])
	.directive('navBar', [function(){
		return {
			controller: function($scope, pagesFactory, $location){
				var path = $location.path().substr(0, 6);

				if(path == '/user'){
					$scope.navLinks = [{
						title: 'Pages',
						url: 'user'
					},
					{
						title: 'Site Settings',
						url: 'user/site-settings'
					}];
				}
				else{
					pagesFactory.getPages().then(
						function(response){
							$scope.navLinks = response.data;
						},
						function(){});
				}
			},
			templateURL: 'partials/directives/nav.html'
		};
	}])
	.directive('userLogin', [function(){
		return{
			controller: function($scope, $cookies){
				$scope.loggedInUser = $cookies.loggedInUser;
			},
			templateURL: 'partials/directives/user-login.html'
		};
	}])
	.directive('appVersion', ['version', function(version) {
		return function(scope, elm, attrs) {
			elm.text(version);
		};
	}]);
