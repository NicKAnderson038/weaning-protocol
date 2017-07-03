(function () {
    'use strict';

    angular.module('app.secretion').controller('Secretion', Secretion);

    Secretion.$inject = ['$state', '$sessionStorage', 'factoryService'];

    function Secretion($state, $sessionStorage, factoryService) {
        var vm = this;

        vm.$sessionStorage = $sessionStorage

        vm.goBack = _goBack;
        vm.enumCalc = _enumCalc;
        vm.array = [];
        vm.secretionHeader = "Secretions";
        vm.secretionArray = [{
            "id": 12,
            "enum": 3,
            "link": "wean.lungs",
            "label": "Moderate amount with in-frequent succoning?"
        }, {
            "id": 12,
            "enum": 2,
            "link": "wean.lungs",
            "label": "Large amount with in-frequent succoning?"
        }, {
            "id": 12,
            "enum": 1,
            "link": "wean.lungs",
            "label": "Coupious amount with Frequent succoning?"
        }];

        activate();

        ////////////////

        function activate() {
            console.log('sub-state ' + vm.secretionHeader + ' loaded!');
        }

        function _goBack() {
            window.history.back();
        }

        function _enumCalc(e) {
            let x = e.enum
            vm.array.push(e);
            //factoryService.secretion(vm.array)
            vm.$sessionStorage.formData.secretion = vm.array
            $sessionStorage.formData.enum = x + $sessionStorage.formData.enum
            console.log($sessionStorage.formData)
        }
    }
})();