'use strict';

describe('app.contacts module', function() {

  beforeEach(module('app.contacts'));

  describe('Contacts controller', function(){
        var $httpBackend, createController;

        beforeEach(inject(function($injector) {
           // Set up the mock http service responses
           $httpBackend = $injector.get('$httpBackend');

           // The $controller service is used to create instances of controllers
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
                                  .respond(403, '');

            var controller = createController();
            $httpBackend.flush();

            expect(controller.contacts).toBeDefined();
            expect(controller.contacts.length).toBe(0);
       });

  });
});