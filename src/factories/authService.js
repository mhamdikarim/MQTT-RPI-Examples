var CallbackStore = require('famous/utilities/CallbackStore');

function AuthService($http,Session) {
    var authService = {};
    authService._session = new CallbackStore();
    
    authService.getSession = function() {
        $http({
            method: 'GET',
            url: 'api/_session'
        }).then(function(response) {
            if (response.data.userCtx.name) {  
            console.log(response)   
                authService.username = response.data.userCtx.name;
                Session.create(response.data.userCtx.id, response.data.userCtx.name, response.data.userCtx.roles);
            } else {
                delete authService.username;
                Session.destroy();
            }
            authService._session.trigger('auth:updated')
        }).catch(function(err) {
            delete authService.username;
            Session.destroy();
            authService._session.trigger('auth:updated')
        });
    };
    authService.isAuthenticated = function () {
        return !!Session.userId;
    };
    authService.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
          authorizedRoles = [authorizedRoles];
        }
        return (authService.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
    }
    authService.curentUser = function() {
        return $http({
            method: 'GET',
            url: 'api/_users/me'
        });
    };
    authService.signup = function(credentials) {
         var userId = 'bookcars:' + credentials.email;     
        $http.put("api/_users/" + userId, credentials)
        .then(function(response) {
            $http.post("api/_session",{email: credentials.email, password: credentials.password}).then(function(res) {
                authService.username = res.data.name;
                authService._session.trigger('auth:updated')
            })
        }).catch(function(err) {
            console.log(err)
            authService._session.trigger('auth:updated',err)
        });
    };
    authService.updated = function(newUser) {
        var userId = 'bookcars:' + credentials.email;     
        $http.put("api/_users/" + userId, credentials)
        .then(function(response) {
            //Session.create(response.data.id, response.data.user.name, response.data.user.roles);
            authService.username = response.data.name;
            authService._session.trigger('auth:updated')
        }).catch(function(err) {
            console.log(err)
            authService._session.trigger('auth:updated')
        });
    };
    authService.login = function(crds) {
        $http.post("api/_session",crds)
        .then(function(response) {
            Session.create(response.data.id, response.data.user.name, response.data.user.roles);
            authService.username = response.data.user.name;
            authService.user  = response.data.user;
            authService._session.trigger('auth:updated')
        }).catch(function(err) {
            console.log(err)
            delete authService.username;
            delete authService.user;
            Session.destroy();
            authService._session.trigger('auth:updated')
        })
    };
    authService.logout = function() {
        $http.delete("api/_session").then(function(response) {
            delete authService.username;
            delete authService.user;
            authService._session.trigger('auth:updated')
        }).catch(function(err) {
            delete authService.username;
            delete authService.user;
            Session.destroy();
            authService._session.trigger('auth:updated')
        });
    };
    return authService;  
}
module.exports = AuthService;