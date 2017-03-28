function HomeCtrl($scope, AuthService) {
	

    $scope.username = AuthService.username;
  	
 
};

module.exports = HomeCtrl;