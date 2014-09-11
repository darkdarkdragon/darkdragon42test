'use strict';

(function() {

    angular.module('app.services', ['ngResource'])
    .factory('Contact', ['$resource',
        function($resource) {
            return $resource('/api/v1/contact/:contactId', {},
                {
                    query: {
                        method:'GET',
                        isArray:true,
                        transformResponse: function(data, header) {
                            if (data) {
                                var obj = angular.fromJson(data);
                                if (obj.objects && angular.isArray(obj.objects)) {
                                    return obj.objects;
                                } else {
                                    return [];
                                }
                            } else {
                                return [];
                            }
                        }
                    },
                    update: {
                        method: 'PUT'
                    }
                }
            );
        }]
    );

//jscs:disable validateIndentation
})();
