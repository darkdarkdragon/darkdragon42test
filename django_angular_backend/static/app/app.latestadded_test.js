'use strict';

//jscs:disable requireCamelCaseOrUpperCaseIdentifiers
describe('app.latestadded module', function() {

    beforeEach(module('app.contacts'));
    beforeEach(module('app.services'));
    beforeEach(module('app.latestadded'));

    describe('LatestAdded Dirctive', function() {
        var element;
        var scope;
        var $httpBackend;

         // load the templates
        beforeEach(module('my.templates'));

        beforeEach(inject(function($rootScope, $compile, $injector) {
            $httpBackend = $injector.get('$httpBackend');
            var requestHandler = $httpBackend.expectGET('/api/v1/contact')
                .respond({objects: [
                    { first_name: 'Ivan',  date_created: '2012-05-24T09:27:44.306000', cellphone_number: '+30' },
                    { first_name: 'Bob',   date_created: '2013-05-24T09:27:44.306000', phone_number: '+20' },
                { first_name: 'Alice', date_created: '2014-05-24T09:27:44.306000' }]});

            scope = $rootScope.$new();

            element = angular.element('<latest-added></latest-added>');

            $compile(element)(scope);
            scope.$digest();
            $httpBackend.flush();

        }));

        it('Should have rendered template.', function() {
            var t = element.find('h4');
            expect(t.text()).toBe('Latest added contacts!');
        });

        it('Should show latest contact first.', function() {
            var t = element.find('div').find('div').find('div');
            expect(t.eq(0).text().trim()).toBe('Alice');
        });

        it('Should show No number if no phone', function() {
            var t = element.find('div').find('div').find('div');
            expect(t.eq(1).text()).toBe('No number');

        });

        it('Should show phone_number if has one', function() {
            var t = element.children('div').eq(0).children('div').eq(2).children('div').eq(1);
            expect(t.text()).toBe('+20');
        });

        it('Should show cellphone_number if no phone_number', function() {
            var t = element.children('div').eq(0).children('div').eq(3).children('div').eq(1);
            expect(t.text()).toBe('+30');
        });

    });

    describe('LatestAdded Controller', function() {

        it('Should fetch contacts from server.', inject(function($injector) {
            var $httpBackend = $injector.get('$httpBackend');
            var $controller = $injector.get('$controller');

            var requestHandler = $httpBackend.expectGET('/api/v1/contact')
                .respond({objects: [
                    { first_name: 'Ivan',  date_created: '2012-05-24T09:27:44.306000', cellphone_number: '+30' },
                    { first_name: 'Bob',   date_created: '2013-05-24T09:27:44.306000', phone_number: '+20' },
                { first_name: 'Alice', date_created: '2014-05-24T09:27:44.306000' }]});

            var controller = $controller('LatestAddedController');
            $httpBackend.flush();

            expect(controller.contacts).toBeDefined();
            expect(controller.contacts.length).toBe(3);

        }));

    });

});
