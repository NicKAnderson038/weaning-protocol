(function () {
    'use strict';

    angular.module('app.cbc').controller('Cbc', Cbc);

    Cbc.$inject = ['$scope', '$sessionStorage', 'factoryService'];

    function Cbc($scope, $sessionStorage, factoryService) {
        var vm = this;

        vm.$sessionStorage = $sessionStorage

        vm.goBack = _goBack;
        vm.enumCalc = _enumCalc;
        vm.array = [];
        vm.cbcHeader = 'White blood cell count';
        vm.cbc = [{
            "id": 19,
            "enum": 0,
            "link": "wean.infection",
            "label": "WBC <= 4?"
        }, {
            "id": 20,
            "enum": 4,
            "link": "wean.infection",
            "label": "WBC 5 - 10?"
        }, {
            "id": 21,
            "enum": 3,
            "link": "wean.infection",
            "label": "WBC 11 - 14?"
        }, {
            "id": 19,
            "enum": 0,
            "link": "wean.infection",
            "label": "WBC >= 15?"
        }, {
            "id": 21,
            "enum": 0,
            "link": "wean.infection",
            "label": "WBC result pending"
        }];

        activate();

        ////////////////

        function activate() {
            console.log('sub-state ' + vm.cbcHeader + ' loaded!');
        }

        function _goBack() {
            window.history.back();
        }

        function _enumCalc(e) {
            let x = e.enum
            vm.array.push(e);
            vm.$sessionStorage.formData.cbc = vm.array
            $sessionStorage.formData.enum = x + $sessionStorage.formData.enum
            //factoryService.cbc(vm.array)
            console.log($sessionStorage.formData)
        }
    }
})();