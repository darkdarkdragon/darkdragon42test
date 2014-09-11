'use strict';
(function() {

    angular.module('app.contactform', ['ngRoute'])
    .controller('ContactForm', ['$http', '$routeParams', 'Contact', ContactForm])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/contacts/:contactId', {
            templateUrl: '/static/contactform.html',
            controller: 'ContactForm',
            controllerAs: 'contactForm'
        });
    }]);

    function ContactForm($http, $routeParams, Contact) {
        this.disabled = true;
        this.contact = {};
        if (!isNaN(parseInt($routeParams.contactId))) {
            var _id = parseInt($routeParams.contactId);
            this.contact.id = _id;
            var self = this;
            this.contact = Contact.get({ contactId: this.contact.id }, function(u, getResponseHeaders) {
                if (u.id === _id) {
                    self.disabled = false;
                }
            }, function(response) {
                if (response.status == 404) {
                    self.disabled = false;
                    self.contact.id = parseInt($routeParams.contactId);
                }
            });
        }

        this.save = function() {
            if (!this.disabled) {
                Contact.update({ contactId: this.contact.id }, this.contact);
            }
        };

    }

})();
