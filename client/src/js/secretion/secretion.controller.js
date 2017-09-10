(function () {
    'use strict';

    angular.module('app.secretion').controller('Secretion', Secretion);

    Secretion.$inject = ['$state', '$sessionStorage', 'factoryService'];

    function Secretion($state, $sessionStorage, factoryService) {
        var vm = this;

        vm.$state = $state
        vm.$sessionStorage = $sessionStorage

        vm.goBack = _goBack
        vm.enumCalc = _enumCalc
        vm.selected = _selected

        vm.array = []
        vm.secretionHeader = "Secretions"
        vm.secretion = [{
            "id": 0,
            "value": 3,
            "enum": 3,
            "label": "Small/None from succoning?"
        }, {
            "id": 1,
            "value": 3,
            "enum": 3,
            "label": "Moderate amount from succoning?"
        }, {
            "id": 2,
            "value": 1,
            "enum": 2,
            "label": "Large amount from succoning?"
        }, {
            "id": 3,
            "value": 0,
            "enum": 1,
            "label": "Coupious amount with Frequent succoning?"
        }]

        activate()

        ////////////////

        function activate() {
            console.log('sub-state ' + vm.secretionHeader + ' loaded!')
            if(vm.$sessionStorage.formData.secretionValue != 0){
                vm.$sessionStorage.formData.totalValue = vm.$sessionStorage.formData.totalValue - vm.$sessionStorage.formData.secretionValue
                vm.$sessionStorage.formData.secretionValue = 0
            }
            if (vm.$sessionStorage.formData.enum == undefined) {
                return vm.$state.go('wean.landing')
            }
        }

        function _goBack() {
            if(vm.$sessionStorage.formData.secretion != undefined){
                vm.$sessionStorage.formData.secretion = undefined
            }else{
                vm.$sessionStorage.formData.enum.pop()
                console.log(vm.$sessionStorage.formData.enum)
            }
            window.history.back()
        }

        function _enumCalc(e) {
            let i = vm.array.length
            if(e.id == 0){
                while (i--) {
                    if (vm.array[i] == 'Moderate amount from succoning' || 
                        vm.array[i] == 'Large amount from succoning' ||
                        vm.array[i] == 'Coupious amount with Frequent succoning') {
                        vm.array.splice(i, 1);
                    }
                }
                vm.secretion[1].selected = false
                vm.secretion[2].selected = false
                vm.secretion[3].selected = false
            }

            if(e.id == 1){
                while (i--) {
                    if (vm.array[i] == 'Small/None from succoning' || 
                        vm.array[i] == 'Large amount from succoning' ||
                        vm.array[i] == 'Coupious amount with Frequent succoning') {
                        vm.array.splice(i, 1);
                    }
                }
                vm.secretion[0].selected = false
                vm.secretion[2].selected = false
                vm.secretion[3].selected = false
            }

            if(e.id == 2){
                while (i--) {
                    if (vm.array[i] == 'Small/None from succoning' || 
                        vm.array[i] == 'Moderate amount from succoning' ||
                        vm.array[i] == 'Coupious amount with Frequent succoning') {
                        vm.array.splice(i, 1);
                    }
                }
                vm.secretion[0].selected = false
                vm.secretion[1].selected = false
                vm.secretion[3].selected = false
            }

            if(e.id == 3){
                while (i--) {
                    if (vm.array[i] == 'Small/None from succoning' || 
                        vm.array[i] == 'Moderate amount from succoning' ||
                        vm.array[i] == 'Large amount from succoning') {
                        vm.array.splice(i, 1);
                    }
                }
                vm.secretion[0].selected = false
                vm.secretion[1].selected = false
                vm.secretion[2].selected = false
            }           

            let x = e.label.slice(0, -1)
            if (vm.array.indexOf(x) == -1) {
                vm.array.push(x)
            } else {
                for (let k = vm.array.length - 1; k >= 0; k--) {
                    if (vm.array[k] === x) {
                        vm.array.splice(k, 1)
                        break
                    }
                }
            }
        }

        function _selected() {

            for (let i = 0; i < vm.array.length; i++) {
                let x = vm.array[i]
                for (let j = 0; j, j < vm.secretion.length; j++) {
                    if (x == vm.secretion[j].label.slice(0, -1)) {
                        vm.$sessionStorage.formData.secretionValue = vm.$sessionStorage.formData.secretionValue + vm.secretion[j].value
                    }
                }

            }

            let x = 2 * vm.array.length
            vm.$sessionStorage.formData.secretion = vm.array
            vm.$sessionStorage.formData.enum.push(x)
            // vm.$sessionStorage.formData.backBtn = $state.$current.toString().substring(5)
            vm.$sessionStorage.formData.totalValue = vm.$sessionStorage.formData.totalValue + vm.$sessionStorage.formData.secretionValue
            $state.go('wean.secretion')
        }
    }
})();