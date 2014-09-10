'use strict';
(function () {

angular.module('app.contacts', ['ngRoute'])
.controller('Contacts', ['$http', Contacts])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: '/static/contacts.html',
    controller: 'Contacts',
    controllerAs: 'contactsHolder'
  });
}]);



function Contacts($http) {
    this.contacts = [];
    var self = this;
    $http.get('/api/v1/contact').success(function(data) {
        if (data != null && data.objects != null && angular.isArray(data.objects)) {
            self.contacts = data.objects;
        } else {
            self.contacts = [];
        }
    }).error(function(data, status, headers, config) {
            self.contacts = [];
    });
}


})();
