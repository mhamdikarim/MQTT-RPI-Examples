function AuthResolver($q, $rootScope, $state,AuthService) {
  return {
    resolve: function () {
    	var deferred = $q.defer();
    	/*
    	if (currentUser) {
            deferred.resolve(currentUser);
        } else {
            deferred.reject();
            $state.go('home');
            $(".large-popup.login").slideToggle();
        }
        */
      	return deferred.promise;
    }
  };
}
AuthResolver.$inject = ['$q', '$rootScope', '$state','AuthService'];
module.exports = AuthResolver;