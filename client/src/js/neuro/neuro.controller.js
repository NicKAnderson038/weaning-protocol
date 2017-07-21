(function () {
    'use strict';

    angular.module('app.neuro').controller('Neuro', Neuro);

    Neuro.$inject = ['$scope', '$state', '$sessionStorage', 'factoryService'];

    function Neuro($scope, $state, $sessionStorage, factoryService) {
        var vm = this

        vm.$state = $state
        vm.$sessionStorage = $sessionStorage

        vm.goBack = _goBack
        vm.enumCalc = _enumCalc
        vm.selected = _selected

        vm.array = [];
        vm.neuroHeader = "Neuro";
        vm.neuro = [{
            "id": 1,
            "enum": 3,
            "label": "Regained level of conscious from narcotic medications?"
        }, {
            "id": 2,
            "enum": 1,
            "label": "Seizure activity present?"
        }, {
            "id": 3,
            "enum": 3,
            "label": "Patient awake and alert."
        }];

        activate();

        ////////////////

        function activate() {
            console.log('sub-state ' + vm.neuroHeader + ' loaded!')
            if (vm.$sessionStorage.formData.backBtn == undefined) {
                return vm.$state.go('wean.landing')
            }
        }

        function _goBack() {
            vm.$state.go($sessionStorage.formData.backBtn)
        }

        function _enumCalc(e) {
            let x = e.slice(0, -1)
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
            vm.$sessionStorage.formData.backBtn = $state.$current.toString().substring(5)
            $state.go('wean.result')
            console.log($sessionStorage.formData)
        }

    }
})();