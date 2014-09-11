'use strict';

//jscs:disable requireCamelCaseOrUpperCaseIdentifiers
describe('app.mycontacts module', function() {

    beforeEach(module('app.mycontacts'));

    describe('mycontacts controller', function() {

        it('should ....', inject(function($controller) {
            //spec body
            var mycontactsCtrl = $controller('MyContacts');
            expect(mycontactsCtrl.myData).toBeDefined();
            expect(mycontactsCtrl.myData.firstName).toEqual('Ivan');
        }));

    });
});
