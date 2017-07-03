(function () {
    'use strict';

    angular.module('app.factory', [])
        .factory('factoryService', factoryService);

    factoryService.$inject = ['$q', '$state'];

    function factoryService($q, $state) {
        var vm = this
        vm.$q = $q
        vm.$state = $state

        var service = {
            timeBegin: exposedFn,
            labs: exposedFn,
            cbc: exposedFn,
            infection: exposedFn,
            xray: exposedFn,
            secretion: exposedFn,
            lungs: exposedFn,
            cardiac: exposedFn,
            neuro: exposedFn,
            test: exposedFn
            //exposedFn: exposedFn
        };

        return service;

        ////////////////
        function exposedFn(data) {
            console.log(data)
            // console.log($state.$current) 
            // console.log($state.$current.name)      
            //     if ($state.$current.includes["wean.landing"]) {
            //         service.timeBegin = data
            //         console.log(service.timeBegin)
            //     }else if($state.$current.includes["wean.labs"]){
            //         service.labs = data
            //         console.log(service.labs)
            //     }
            // console.log(service)

            switch ($state.$current.name) {
                case "wean.landing":
                    service.timeBegin = data
                    break;
                case "wean.labs":
                    service.labs = data
                    break;
                case "wean.cbc":
                    service.cbc = data
                    break;
                case "wean.infection":
                    service.infection = data
                    break;
                case "wean.xray":
                    service.xray = data
                    break;
                case "wean.secretion":
                    service.secretion = data
                    break;
                case "wean.result":
                    service.lungs = data //different area
                    break;
                case "wean.cardiac":
                    service.cardiac = data
                    break;
                case "wean.neuro":
                    service.neuro = data
                    break;
                default:
                    //$state.go("unauthorized");
                    console.log("Switch Case Switch Case Switch Case Switch Case Switch Case Switch Case");
                    break;
            }
            
            


        }
    }
})();