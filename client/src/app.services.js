(function () {
        'use strict';

        angular.module('app.services', [])
                .factory('WeanService', ['$http', '$q', '$resource', function ($http, $q, $resource) {

                        return {

                                array: $resource('data/ptdataArray.json', {}, {
                                        query: {
                                                method: 'GET',
                                                params: {},
                                                isArray: true
                                        }
                                }),
                                obj: $resource('data/ptdata.json', {}, {
                                        query: {
                                                method: 'GET',
                                                params: {},
                                                isArray: false
                                        }
                                })

                                
                        };
                }])
})();