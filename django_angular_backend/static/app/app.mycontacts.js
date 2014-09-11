'use strict';

(function() {

    angular.module('app.mycontacts', [])
    .controller('MyContacts', MyContacts);

    function MyContacts() {
        this.myData = {
            firstName : 'Ivan',
            lastName: 'Tivonenko',
            birthDate: new Date(1978, 7, 24),
            bio: 'birth and live!',
            contacts: {
                skype: 'darkdarkdragon',
                jabber: 'darkdragon@42cc.co',
                email: 'darkdarkdragon@gmail.com',
                other: 'something goes here'
            }
        };
    }

})();
