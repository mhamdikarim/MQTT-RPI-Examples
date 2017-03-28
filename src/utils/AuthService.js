'use strict';

var utils = require('./ajax');
var Utilities = require('famous/Utilities');
var CallbackStore = require('famous/utilities/CallbackStore');

 
function AuthError(message) {
  this.status = 400;
  this.name = 'authentication_error';
  this.message = message;
  this.error = true;
  try {
    Error.captureStackTrace(this, AuthError);
  } catch (e) {}
}

utils.inherits(AuthError, Error);

// provide more helpful error message
function wrapError(callback) {
  return function (err, res) {
    return callback(err, res);
  };
}

var AuthService = {};

var GetSession = utils.toPromise(function (callback) {
  var opts = {};
  var ajaxOpts = utils.extend(true, { method : 'GET',
    url : 'http://192.168.1.61:3000/api/_session',
    headers : {'Content-Type': 'application/json'},
    withCredentials: true,
    useDefaultXhrHeader: true,
    crossDomain: true,
  } , opts.ajax || {});
  utils.ajax(ajaxOpts, wrapError(callback));
});

AuthService.getSession = function(Session) {
  GetSession().then(function(response) {
    
    if (response.userCtx.name) {
      AuthService.username = response.userCtx.name;
    } else {
      delete AuthService.username;
    }
    Session.trigger('auth:updated')
  }).catch(function(err) {
    Session.trigger('auth:updated')
  });
};


function putUser(user, callback) {
  var opts = {};
  var ajaxOpts = utils.extend(true, {
    method : 'PUT',
    url : 'http://192.168.1.61:3000/api/_users/' + user._id ,
    headers : {'Content-Type': 'application/json'},
    withCredentials: false,
    useDefaultXhrHeader: false,
    body : user
    },opts.ajax || {}
  );

  utils.ajax(ajaxOpts, wrapError(callback));
}

AuthService.signup = utils.toPromise(function (newPostRef, callback) {
  putUser(newPostRef, callback);
});

AuthService.login  = utils.toPromise(function (username, uid , callback) {
  var opts = {};
  if (!username) {
    return callback(new AuthError('you must provide a username'));
  } else if (!uid ) {
    return callback(new AuthError('you must provide a uid '));
  }
  var ajaxOpts = utils.extend(true, {
    method : 'POST',
    url : 'http://192.168.1.61:3000/api/_session',
    headers : {'Content-Type': 'application/json'},
    withCredentials: true,
    useDefaultXhrHeader: true,
    crossDomain: true,
    //withCredentials: false,
    //useDefaultXhrHeader: true,
    body : JSON.stringify({name: username, uid: uid})
    },opts.ajax || {}
  );
  utils.ajax(ajaxOpts, wrapError(callback));
});


AuthService.logout = utils.toPromise(function (callback) {
  var opts = {};
  var ajaxOpts = utils.extend(true, {
    method : 'DELETE',
    url : 'http://192.168.1.61:3000/api/_session',
    headers : {'Content-Type': 'application/json'},
    withCredentials: true,
    useDefaultXhrHeader: true,
    crossDomain: true,
  }, opts.ajax || {});
  utils.ajax(ajaxOpts, wrapError(callback));
});

module.exports = AuthService ;  