function AuthInterceptor($rootScope, $q,AUTH_EVENTS) {
  return {
    responseError: function (response) { 
    	console.log(response)
      $rootScope.$broadcast({
        412: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized,
        419: AUTH_EVENTS.sessionTimeout,
        440: AUTH_EVENTS.sessionTimeout
      }[response.status], response);
      return $q.reject(response);
    }
  };
}
AuthInterceptor.$inject = ['$rootScope', '$q','AUTH_EVENTS']
module.exports = AuthInterceptor;