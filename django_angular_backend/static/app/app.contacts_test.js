'use strict';

//jscs:disable requireCamelCaseOrUpperCaseIdentifiers
describe('app.contacts module', function() {

    beforeEach(module('app.contacts'));
    beforeEach(module('app.services'));

    describe('Offset fliter', function() {
        it('should be', inject(function($filter) {
            expect($filter('offset')).not.toBeNull();
        }));

        it('should be slicing', inject(function($filter) {
            var filter = $filter('offset');
            expect(filter([], 0)).toEqual([]);
            expect(filter([], 10)).toEqual([]);
            expect(filter([1], 1)).toEqual([]);
            expect(filter([1, 2], 1)).toEqual([2]);
        }));

    });

    describe('PhoneCountry filter', function() {
        it('should be', inject(function($filter) {
            expect($filter('phoneCountry')).not.toBeNull();
        }));

        it('should be correct adding USA', inject(function($filter) {
            var filter = $filter('phoneCountry');
            expect(filter('')).toBe('');
            expect(filter(' +34')).toBe(' +34');
            expect(filter('+1e')).toBe('USA +1e');
            expect(filter(1)).toBe(1);
            expect(filter('  +1222')).toBe('USA   +1222');
        }));

    });

    describe('Contacts controller pagination', function() {
        it('should have filter and order vars', inject(function($controller) {
            var controller = $controller('Contacts');
            expect(controller.query).toBeDefined();
            expect(controller.orderPop).toBeDefined();
        }));

        it('should have pagination vars', inject(function($controller) {
            var controller = $controller('Contacts');
            expect(controller.pageSize).toBeDefined();
            expect(controller.pageSize).toBe(2);
            expect(controller.currentPage).toBeDefined();
            expect(controller.currentPage).toBe(0);
            expect(controller.leftEnabled).toBeDefined();
            expect(controller.leftEnabled).toBe(false);
            expect(controller.rightEnabled).toBeDefined();
            expect(controller.rightEnabled).toBe(false);
        }));

        it('should disable right/left buttons when needed', inject(function($controller) {
            var controller = $controller('Contacts');
            controller.back();
            expect(controller.leftEnabled).toBe(false);
            expect(controller.rightEnabled).toBe(false);
            expect(controller.currentPage).toBe(0);
            controller.forth();
            expect(controller.leftEnabled).toBe(false);
            expect(controller.rightEnabled).toBe(false);
            expect(controller.currentPage).toBe(0);

            controller.contacts = [1, 2, 3, 4];
            controller.pageSize = 3;
            controller.setEnabledState();
            expect(controller.leftEnabled).toBe(false);
            expect(controller.rightEnabled).toBe(true);
            controller.forth();
            expect(controller.leftEnabled).toBe(true);
            expect(controller.rightEnabled).toBe(false);
            expect(controller.currentPage).toBe(1);
            controller.forth();
            expect(controller.leftEnabled).toBe(true);
            expect(controller.rightEnabled).toBe(false);
            expect(controller.currentPage).toBe(1);
            controller.back();
            expect(controller.leftEnabled).toBe(false);
            expect(controller.rightEnabled).toBe(true);
            expect(controller.currentPage).toBe(0);

        }));
    });

    describe('Contacts controller', function() {
        var $httpBackend;
        var createController;

        beforeEach(inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');

            var $controller = $injector.get('$controller');

            createController = function() {
                return $controller('Contacts');
            };
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should get data right', function() {
            var requestHandler = $httpBackend.expectGET('/api/v1/contact')
                                  .respond({objects: [{first_name: 'Ivan'}, {cellphone_number: '103'}] });

            var controller = createController();
            $httpBackend.flush();

            expect(controller.contacts).toBeDefined();
            expect(controller.contacts.length).toBe(2);
            expect(controller.contacts[0].first_name).toBe('Ivan');
            expect(controller.contacts[1].cellphone_number).toBe('103');
        });

        it('should handle invalid data', function() {
            var requestHandler = $httpBackend.expectGET('/api/v1/contact')
                                  .respond({objects: 1 });

            var controller = createController();
            $httpBackend.flush();

            expect(controller.contacts).toBeDefined();
            expect(controller.contacts.length).toBe(0);
        });

        it('should handle invalid data 2', function() {
            var requestHandler = $httpBackend.expectGET('/api/v1/contact')
                                  .respond({no_objects: 1 });

            var controller = createController();
            $httpBackend.flush();

            expect(controller.contacts).toBeDefined();
            expect(controller.contacts.length).toBe(0);
        });

        it('should handle invalid data 3', function() {
            var requestHandler = $httpBackend.expectGET('/api/v1/contact')
                                  .respond(null);

            var controller = createController();
            $httpBackend.flush();

            expect(controller.contacts).toBeDefined();
            expect(controller.contacts.length).toBe(0);
        });

        it('should handle http error', function() {
            var requestHandler = $httpBackend.expectGET('/api/v1/contact')
                                  .respond(403);

            var controller = createController();
            $httpBackend.flush();

            expect(controller.contacts).toBeDefined();
            expect(controller.contacts.length).toBe(0);
        });

    });
});
