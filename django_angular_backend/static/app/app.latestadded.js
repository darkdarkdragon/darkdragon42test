'use strict';
(function() {

    angular.module('app.latestadded', [])
    .controller('LatestAddedController', ['Contact', LatestAddedController])
    .directive('latestAdded', LatestAddedDirctive);

    function LatestAddedDirctive() {
        return {
            restrict : 'EA',
            templateUrl : '/static/latestadded.html',
            controller : 'LatestAddedController',
            controllerAs : 'latestAddedcontroller'

        };
    }

    function LatestAddedController(Contact) {
        this.contacts = Contact.query();
    }

})();
