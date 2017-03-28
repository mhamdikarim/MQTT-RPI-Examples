var Configs = {
	router: function($stateProvider, $urlRouterProvider,USER_ROLES) {

		this.home = {
			name: 'home',
			url: '/',
			templateUrl: 'views/home.html',
			controller: 'HomeCtrl as Home'
			//resolve: load('./controllers/scroll.js'),
			/*
			resolve: {
				loadPlugin: function ($ocLazyLoad) {
					return $ocLazyLoad.load([
						{
                            files: ['assets/vendor/revslider/js/jquery.themepunch.tools.min.js']
                        },
						{
							name: 'revslider',
	                        files: ["assets/vendor/revslider/js/jquery.themepunch.revolution.min.js"]
						}
					]);
				}
			}
			*/
		};
		this.not_found =  {
			name: 'not-found',
	      	url: '/not-found',
	      	templateUrl: 'views/404.client.view.html',
	      	data: {
	        	ignoreState: true
	      	}
	    };
   
    	this.bad_request = {
    		name:'bad-request',
    		url: '/bad-request',
    		templateUrl: 'views/400.client.view.html',
    		data: {
    			ignoreState: true
    		}
	    };

	    this.forbidden =  {
	    	name: 'forbidden',
	    	url: '/forbidden',
	    	templateUrl: 'views/403.client.view.html',
	    	data: {
	    		ignoreState: true
	    	}
	    };
		/*
		this.contactsInfo = {
			name: 'contacts.info',
			parent: 'contacts',
			url: '/:id',
			templateUrl: 'views/contacts.info.html',
			controller: function($stateParams, ContactService) {
				ContactService.selectContact($stateParams.id);
				this.contact = ContactService.selectedContact;
			},
			controllerAs: 'ContactInfo'
		};
		*/
		 // Redirect to 404 when route not found
	    $urlRouterProvider.otherwise('/');
	 	$stateProvider
		.state(this.home)
		.state(this.bad_request)
		.state(this.not_found)
		.state(this.forbidden)
		
	}
}
function load(srcs, callback) {
    return {
        deps: ['$ocLazyLoad', '$q', function( $ocLazyLoad, $q ){
            var deferred = $q.defer();
            var promise  = false;
            srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
            if(!promise){
                promise = deferred.promise;
            }
           
        }]
    }
}

module.exports = Configs;
 