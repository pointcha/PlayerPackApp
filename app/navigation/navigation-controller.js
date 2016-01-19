(function(){
	angular.module('PlayerPack')
	.controller('NavigationController', ['$scope', '$state', '$http', function($scope, $state, $http){

		$scope.logUserIn = function(){
			$http.post('api/user/login', $scope.login).success(function(response){
				localStorage.setItem('User-Data', JSON.stringify(response));
			}).error(function(error){
				console.error(error);
			});
		}

	}]);

}());