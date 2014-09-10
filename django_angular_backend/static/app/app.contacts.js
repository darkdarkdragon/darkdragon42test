'use strict';
(function () {

angular.module('app.contacts', ['ngRoute'])
.controller('Contacts', ['$http', Contacts])
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
        if (typeof value == 'string' && value.trimLeft().startsWith('+1')) {
            return 'USA ' + value;
        }
        return value;
    };
}

function Contacts($http) {
    this.contacts = [];
    this.query = '';
    this.orderPop = '';
    this.currentPage = 0;
    this.pageSize = 2;
    this.leftEnabled = false;
    this.rightEnabled = false;

    var self = this;
    $http.get('/api/v1/contact').success(function(data) {
        if (data != null && data.objects != null && angular.isArray(data.objects)) {
            self.contacts = data.objects;
        } else {
            self.contacts = [];
        }
        self.setEnabledState();
    }).error(function(data, status, headers, config) {
        self.contacts = [];
        self.setEnabledState();
    });

    this.back = function() {
        if (this.currentPage > 0) {
            this.currentPage -= 1;
        }
        this.setEnabledState();
    }

    this.forth = function() {
        if ((this.currentPage + 1) * this.pageSize < this.contacts.length) {
            this.currentPage += 1;
        }
        this.setEnabledState();
    }

    this.setEnabledState = function() {
        this.leftEnabled  = this.currentPage > 0;
        this.rightEnabled = (this.currentPage + 1) * this.pageSize < this.contacts.length;
    }
}


})();
