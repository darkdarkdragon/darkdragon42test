'use strict';
(function () {

angular.module('app.contactform', ['ngRoute'])
.controller('ContactForm', ['$http', '$routeParams', ContactForm])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts/:contactId', {
    templateUrl: '/static/contactform.html',
    controller: 'ContactForm',
    controllerAs: 'contactForm'
  });
}]);



function ContactForm($http, $routeParams) {
    this.disabled = true;
    this.contact = {};
    if (!isNaN(parseInt($routeParams.contactId))) {
        this.contact.id = parseInt($routeParams.contactId);
        var self = this;
        $http.get('/api/v1/contact/' + this.contact.id).success(function(data) {
            if (data !== null && data.id === self.contact.id) {
                self.contact = data;
                self.disabled = false;
            }
        }).error(function(data, status, headers, config) {
            if (status == 404) {
                self.disabled = false;
            }
        });
    }

    this.save = function() {
        if (!this.disabled) {
            var self = this;
            $http.put('/api/v1/contact/' + self.contact.id, self.contact);
        }
    };

}


})();
