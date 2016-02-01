(function(){
	angular.module('PlayerPack')
	.controller('EditProfileController', ['Upload', '$scope', '$state', '$http', function(upload, $scope, $state, $http){

		$scope.user = JSON.parse(localStorage['User-Data']) || undefined;

//console.log($scope);

		$scope.$watch(function(){
			return $scope.file
		}, function (){
			$scope.upload($scope.file);
		});

		$scope.upload = function (file) {
			if (file){
				upload.upload({
					url: 'api/profile/editPhoto',
					method: 'POST',
					data: {userId: $scope.user._id},
					file: file
				}).progress(function(evt){
					console.log("firing");
				}).success(function(data){

				}).error(function(error){
					console.log(error);
				})
			}
		};

		$scope.updateProfile = function () {
			var request = {
				userId: $scope.user._id,
				userfirstname: $scope.user.userfirstname,
				userlastname: $scope.user.userlastname,
    			usernumber: $scope.user.usernumber,
    			userposition: $scope.user.userposition,
    			userteam: $scope.user.userteam,
				bio: $scope.user.bio
			}
console.log(request);

	$http.post('api/profile/updateUserProfile', request).success(function(){
				console.log("success");
			}).error(function(error){
				console.log(error);
			});
		};

	}]);

}());