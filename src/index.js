var CallbackStore = require('famous/utilities/CallbackStore');
var Session = new CallbackStore();
var PouchDB = require("pouchdb");
var angular = require('angular-last');
var ocLazyLoad = require('ocLazyLoad');
var modules = [require('angular-ui-router'),'oc.lazyLoad'];
var app = angular.module('app', modules);
var FamousEngine = require('famous/core/FamousEngine');
var Dispatch = require('famous/core/Dispatch');
app.value("remotedb", window.location.origin + '/api/cars');
app.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  editor: 'editor',
  guest: 'guest'
})
app.config(function ($provide, $httpProvider,$locationProvider,$ocLazyLoadProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.interceptors.push(['$injector',function ($injector) {
      return $injector.get('AuthInterceptor');
    }]);
    // We configure ocLazyLoad to use the lib script.js as the async loader
    $ocLazyLoadProvider.config({
        debug:  false
    });
});
app.run(function ($rootScope, AUTH_EVENTS, AuthService,$state) {
  //AuthService.getSession();
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    if (toState.data && toState.data.authorizedRoles && toState.data.authorizedRoles.length > 0) {
      var authorizedRoles = toState.data.authorizedRoles;
      console.log(authorizedRoles )
      if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        if (AuthService.isAuthenticated()) {
          $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
              $state.go('forbidden');
          } else {
              // user is not logged in
              $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
              $state.go('home').then(function () {
                  $(".large-popup.login").slideToggle();
                });
            }
        }
    }
    });
});
app.config(['$stateProvider','$urlRouterProvider','USER_ROLES',require('./configs').router]);
app.service('Session', require('./services/session'));
app.factory('AuthService', ['$http','Session', require('./factories/authService.js')]);
app.factory('AuthInterceptor', require('./factories/authInterceptor'));
app.factory('AuthResolver', require('./factories/authResolver'));
app.factory('pouchLocal', [function() {
  var db = new PouchDB('localdb');
  return db;
}]);
app.factory('pouchResult', ["remotedb", function(remotedb) {
  return new PouchDB(remotedb);
}]);
app.controller('HomeCtrl', ['$scope','AuthService', require('./controllers/HomeCtrl.js')]);
angular.element(document).ready(function () {
  angular.bootstrap(document, ['app']);
});
$(document).ready(function() {
   $(':checkbox').iphoneStyle({
    onChange: function(elem,val) {
      $('span#status').html(val.toString());
      if (val) {
        socket.emit('publish', {topic:"led",payload:"on"});
      } else {
        socket.emit('publish', {topic:"led",payload:"off"});
      }
    }
  });

  var socket = io('https://192.168.1.61:8443');
  socket.on('connect', function () {
    socket.on('mqtt', function (msg) {
      console.log(msg.topic+' '+msg.payload);
      /*
      if (msg.payload == "off") {
       
        if ($('input[name=led]').is(':checked')) {
          $('input[name=led]').prop('checked',false).change();
        }
      }
      if (msg.payload == "on") {
        if (!$('input[name=led]').is(':checked')) {
          $('input[name=led]').prop('checked',true).change();
        }
      }
      */
 
    });
    socket.emit('subscribe',{topic:'led'});
  });
});
/*

These 7 measurements can be structured in a topic hierarchy:

Home/Outdoor/Temperature
Home/Outdoor/Humidity
Home/Garage/Temperature
Home/Garage/Humidity
Home/GroundFloor/Temperature
Home/GroundFloor/Humidity
Home/GroundFloor/PlantStatus
*/


/*

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var sound;

function loadSound(url) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  request.onload = function() {
    // request.response is encoded... so decode it now
    audioCtx.decodeAudioData(request.response, function(buffer) {
      var source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      source.start(0);
      // play right now (0 seconds from now)
      //source.noteOn(0);
      
    }, function(err) {
      throw new Error(err);
    });
  }
  request.send()
}
//loadSound(sound)
// Initialize the engine.
//FamousEngine.init();

var Scenegraph = FamousEngine.createScene('body');
var camera = new Camera(Scenegraph);
camera.setDepth(1000); 

*/


