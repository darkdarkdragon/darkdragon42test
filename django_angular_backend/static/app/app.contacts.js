'use strict';
(function() {

    angular.module('app.contacts', ['ngRoute'])
    .controller('Contacts', ['$filter', '$scope', 'Contact', Contacts])
    .filter('offset', Offset)
    .filter('phoneCountry', PhoneCountry)
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/contacts', {
            templateUrl: '/static/contacts.html',
            controller: 'Contacts',
            controllerAs: 'contactsHolder'
        });
    }]);

    function Offset() {
        return function(input, start) {
            start = parseInt(start, 10);
            return input.slice(start);
        };
    }

    function PhoneCountry() {
        return function(value) {
            var re = /^\s*[+]1.*/;
            if (typeof value == 'string' && re.test(value)) {
                return 'USA ' + value;
            }
            return value;
        };
    }

    function Contacts($filter, $scope, Contact) {
        var self = this;

        this.contacts = [];
        this.contactsFiltered = [];
        this.query = '';
        this.orderPop = '';
        this.currentPage = 0;
        this.pageSize = 2;
        this.leftEnabled = false;
        this.rightEnabled = false;

        this.contacts = Contact.query({}, function(u) {
            self.contactsFiltered = $filter('filter')(u);
            self.setEnabledState();
        }, function(response) {
            self.contacts = [];
            self.setEnabledState();
        });

        this.back = function() {
            if (this.currentPage > 0) {
                this.currentPage -= 1;
            }
            this.setEnabledState();
        };

        this.forth = function() {
            if ((this.currentPage + 1) * this.pageSize < this.contactsFiltered.length) {
                this.currentPage += 1;
            }
            this.setEnabledState();
        };

        this.setEnabledState = function() {
            var pages = Math.ceil(self.contactsFiltered.length / self.pageSize);
            var t1 = (self.currentPage + 1);
            if (self.currentPage > 0 && (self.currentPage + 1) > pages) {
                self.currentPage = 0;
            }
            self.leftEnabled  = self.currentPage > 0;
            self.rightEnabled = (self.currentPage + 1) * self.pageSize < self.contactsFiltered.length;
        };

        $scope.$watch(function() {
            return self.query;
        }, function(newValue, oldValue) {
            self.contactsFiltered = $filter('filter')(self.contacts, newValue);
            self.setEnabledState();
        });

    }

})();
