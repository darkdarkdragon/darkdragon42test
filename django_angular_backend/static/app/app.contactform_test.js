'use strict';

describe('app.contactform module', function() {

  beforeEach(module('app.contactform'));

  describe('ContactForm controller', function(){
        var $httpBackend, createController;
        

        beforeEach(inject(function($injector) {
           // Set up the mock http service responses
           $httpBackend = $injector.get('$httpBackend');

           // The $controller service is used to create instances of controllers
           var $controller = $injector.get('$controller');

           createController = function(contactId) {
             return $controller('ContactForm', { $routeParams : { contactId : contactId }});
           };
        }));


        afterEach(function() {
          $httpBackend.verifyNoOutstandingExpectation();
          $httpBackend.verifyNoOutstandingRequest();
        });

        it('should get data right', function() {

            var requestHandler = $httpBackend.expectGET('/api/v1/contact/2')
                                  .respond({id: 2, first_name: 'Ivan', cellphone_number: '103'});


            var controller = createController(2);
            $httpBackend.flush();

            expect(controller.contact).toBeDefined();
            expect(controller.contact.id).toBe(2);
            expect(controller.contact.first_name).toBe('Ivan');
            expect(controller.disabled).toBe(false);
        });
        it('should save right data', function() {

            var requestHandler = $httpBackend.expectGET('/api/v1/contact/2')
                                  .respond({id: 2, first_name: 'Ivan'});


            var controller = createController(2);
            $httpBackend.flush();

            expect(controller.contact).toBeDefined();
            expect(controller.contact.id).toBe(2);
            expect(controller.disabled).toBe(false);
            controller.contact.first_name = 'Vlad';

            var requestHandler2 = $httpBackend.expectPUT('/api/v1/contact/2', {id: 2, first_name: 'Vlad'}).respond(201, '');
            controller.save();
            $httpBackend.flush();

        });
        it('should create new object on 404', function() {

            var requestHandler = $httpBackend.expectGET('/api/v1/contact/22')
                                  .respond(404);


            var controller = createController(22);
            $httpBackend.flush();

            expect(controller.contact).toBeDefined();
            expect(controller.contact.id).toBe(22);
            expect(controller.disabled).toBe(false);

        });
        it('should handle invalid data', function() {
            var requestHandler = $httpBackend.expectGET('/api/v1/contact/2')
                                  .respond({});

            var controller = createController(2);
            $httpBackend.flush();

            expect(controller.disabled).toBe(true);
        });
        it('should handle invalid url param', function() {

            var controller = createController('bad');
            $httpBackend.verifyNoOutstandingRequest();

            expect(controller.disabled).toBe(true);
        });
        it('should handle http error', function() {
            var requestHandler = $httpBackend.expectGET('/api/v1/contact/2')
                                  .respond(403);

            var controller = createController(2);
            $httpBackend.flush();

            expect(controller.disabled).toBe(true);
        });

  });
});