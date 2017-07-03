(function () {
    'use strict';

    angular.module('app.neuro').controller('Neuro', Neuro);

    Neuro.$inject = ['$scope', '$state', '$sessionStorage','factoryService'];

    function Neuro($scope, $state, $sessionStorage, factoryService) {
        var vm = this;

        vm.$sessionStorage = $sessionStorage

        vm.goBack = _goBack;
        vm.enumCalc = _enumCalc;
        vm.selected = _selected
        vm.array = [];
        vm.neuroHeader = "Neuro";
        vm.neuro = [{ "id": 11, "enum": 128, "link": "/", "label": "Regained level of conscious from narcotic medications?" }, { "id": 11, "enum": 128, "link": "/", "label": "Seizure activity present?" }, { "id": 12, "enum": 256, "link": "/", "label": "Is the patient alert and awake?" }];

        activate();

        ////////////////

        function activate() {
            console.log('sub-state ' + vm.neuroHeader + ' loaded!');
        }

        function _goBack() {
            window.history.back();
        }

        function _enumCalc(e) {
            let x = e.split('?').join('')
            if (vm.array.indexOf(x) == -1) {
                vm.array.push(x)
                console.log(vm.array)
            } else {
                for (var i = vm.array.length - 1; i >= 0; i--) {
                    if (vm.array[i] === x) {
                        vm.array.splice(i, 1)
                        break   
                    }
                }
                console.log(vm.array)
            }
        }

        function _selected() {
            let x = 2 * vm.array.length
            //factoryService.neuro(vm.array)
            vm.$sessionStorage.formData.neuro = vm.array
            $sessionStorage.formData.enum = x + $sessionStorage.formData.enum
            $state.go('wean.result')
            console.log($sessionStorage.formData)
        }

    }
})();