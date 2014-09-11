'use strict';

(function() {

    // Declare app level module which depends on views, and components
    angular.module('app', [
        'ngRoute',
        'app.services',
        'app.mycontacts',
        'app.contacts',
        'app.contactform',
        'app.latestadded',
    ]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/static/myapp.html',
            controllerAs: 'my',
            controller: 'MyContacts'
        });//.when('/contacts', {redirectTo: '/contacts'});
    //  $routeProvider.otherwise({redirectTo: '/view1'});
    }]);

})();
