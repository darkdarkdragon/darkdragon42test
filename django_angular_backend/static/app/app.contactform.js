'use strict';
(function() {

    angular.module('app.contactform', ['ngRoute'])
    .controller('ContactForm', ['$http', '$routeParams', '$scope', 'Contact', ContactForm])
    .directive('datePicker', DatePickerDirctive)

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/contacts/:contactId', {
            templateUrl: '/static/contactform.html',
            controller: 'ContactForm',
            controllerAs: 'contactForm'
        });
    }]);

    function DatePickerDirctive() {
        return function(scope, elem, attrs) {
            elem.datepicker({
                dateFormat: 'yy-mm-dd',
                changeMonth: true,
                changeYear: true,
                yearRange: '-130:+0',
            });
        };
    }

    function ContactForm($http, $routeParams, $scope, Contact) {
        var self = this;

        this.disabled = true;
        this.contact = {};
        this.isBirthDay = false;
        var now = new Date();
        this.todayMonth = now.getMonth();
        this.todayDay = now.getDate();

        if (!isNaN(parseInt($routeParams.contactId))) {
            var _id = parseInt($routeParams.contactId);
            this.contact.id = _id;
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

//jscs:disable requireCamelCaseOrUpperCaseIdentifiers
        $scope.$watch(function() {
            return self.contact.birth_date;
        }, function(newValue, oldValue) {
            self.checkForBirthday(newValue);
        });
//jscs:enable requireCamelCaseOrUpperCaseIdentifiers

        this.save = function() {
            if (!this.disabled) {
                Contact.update({ contactId: this.contact.id }, this.contact);
            }
        };

        this.checkForBirthday = function(date) {
            var newDate = new Date(date);
            self.isBirthDay = self.todayMonth == newDate.getMonth() && self.todayDay == newDate.getDate();
        };

    }

})();
