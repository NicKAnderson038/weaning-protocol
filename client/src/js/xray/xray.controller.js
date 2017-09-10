(function () {
    'use strict';

    angular.module('app.xray').controller('Xray', Xray)

    Xray.$inject = ['$state', '$sessionStorage', 'factoryService']

    function Xray($state, $sessionStorage, factoryService) {
        var vm = this;

        vm.$state = $state
        vm.$sessionStorage = $sessionStorage

        vm.goBack = _goBack
        vm.enumCalc = _enumCalc
        vm.selected = _selected

        vm.array = []
        vm.chestXrayHeader = "Chest X-ray"
        vm.xray = [{
            "id": 0,
            "value": 1,
            "enum": 1,
            "label": "Any chest abnormalities present?"
        }, {
            "id": 1,
            "value": 0,
            "enum": 0,
            "label": "Bilateral diffused pulmonary infiltrate?"
        }, {
            "id": 2,
            "value": 2,
            "enum": 2,
            "label": "Singular Lobular infiltrate?"
        }, {
            "id": 3,
            "value": 1,
            "enum": 2,
            "label": "Multiple Lobular infiltrate?"
        }, {
            "id": 4,
            "value": 5,
            "enum": 4,
            "label": "Clear of cardio/pulmonary abnormalities?"
        }, {
            "id": 5,
            "value": 0,
            "enum": 0,
            "label": "No current Xray with in past 24 hours?"
        }]

        activate()

        ////////////////

        function activate() {
            if (vm.$sessionStorage.formData.xrayValue != 0) {
                vm.$sessionStorage.formData.totalValue = vm.$sessionStorage.formData.totalValue - vm.$sessionStorage.formData.xrayValue
                vm.$sessionStorage.formData.xrayValue = 0
            }
            if (vm.$sessionStorage.formData.enum == undefined) {
                return vm.$state.go('wean.landing')
            }
        }

        function _goBack() {
            if (vm.$sessionStorage.formData.xray != undefined) {
                vm.$sessionStorage.formData.xray = undefined
            } else {
                vm.$sessionStorage.formData.enum.pop()
                console.log(vm.$sessionStorage.formData.enum)
            }
            window.history.back()
        }

        function _enumCalc(e) {
            let i = vm.array.length
            // let x = e.enum,
            //     y = e.value;
            // vm.array.push(e)
            // vm.$sessionStorage.formData.xray = vm.array
            // vm.$sessionStorage.formData.xrayValue = y
            // vm.$sessionStorage.formData.enum.push(x)
            // vm.$sessionStorage.formData.totalValue = vm.$sessionStorage.formData.totalValue + vm.$sessionStorage.formData.xrayValue
            // vm.$state.go('wean.secretion')

            if(e.id == 1){
                while (i--) {
                    if (vm.array[i] == 'Singular Lobular infiltrate' || 
                        vm.array[i] == 'Multiple Lobular infiltrate' ||
                        vm.array[i] == 'Clear of cardio/pulmonary abnormalities' ||
                        vm.array[i] == 'No current Xray with in past 24 hours') {
                        vm.array.splice(i, 1);
                    }
                }
                vm.xray[2].selected = false
                vm.xray[3].selected = false
                vm.xray[4].selected = false
                vm.xray[5].selected = false
            }

            if(e.id == 2){
                while (i--) {
                    if (vm.array[i] == 'Bilateral diffused pulmonary infiltrate' || 
                        vm.array[i] == 'Multiple Lobular infiltrate' ||
                        vm.array[i] == 'Clear of cardio/pulmonary abnormalities' ||
                        vm.array[i] == 'No current Xray with in past 24 hours') {
                        vm.array.splice(i, 1);
                    }
                }
                vm.xray[1].selected = false
                vm.xray[3].selected = false
                vm.xray[4].selected = false
                vm.xray[5].selected = false
            }

            if(e.id == 3){
                while (i--) {
                    if (vm.array[i] == 'Bilateral diffused pulmonary infiltrate' || 
                        vm.array[i] == 'Singular Lobular infiltrate' ||
                        vm.array[i] == 'Clear of cardio/pulmonary abnormalities' ||
                        vm.array[i] == 'No current Xray with in past 24 hours') {
                        vm.array.splice(i, 1);
                    }
                }
                vm.xray[1].selected = false
                vm.xray[2].selected = false
                vm.xray[4].selected = false
                vm.xray[5].selected = false
            }

            if(e.id == 4){
                while (i--) {
                    if (vm.array[i] == 'Bilateral diffused pulmonary infiltrate' || 
                        vm.array[i] == 'Singular Lobular infiltrate' ||
                        vm.array[i] == 'Multiple Lobular infiltrate' ||
                        vm.array[i] == 'No current Xray with in past 24 hours') {
                        vm.array.splice(i, 1);
                    }
                }
                vm.xray[1].selected = false
                vm.xray[2].selected = false
                vm.xray[3].selected = false
                vm.xray[5].selected = false
            }

            if(e.id == 5){
                while (i--) {
                    if (vm.array[i] == 'Bilateral diffused pulmonary infiltrate' || 
                        vm.array[i] == 'Singular Lobular infiltrate' ||
                        vm.array[i] == 'Multiple Lobular infiltrate' ||
                        vm.array[i] == 'Clear of cardio/pulmonary abnormalities') {
                        vm.array.splice(i, 1);
                    }
                }
                vm.xray[1].selected = false
                vm.xray[2].selected = false
                vm.xray[3].selected = false
                vm.xray[4].selected = false
            }

            

            let x = e.label.slice(0, -1)
            if (vm.array.indexOf(x) == -1) {
                vm.array.push(x)
                console.log(vm.array)
            } else {
                for (let k = vm.array.length - 1; k >= 0; k--) {
                    if (vm.array[k] === x) {
                        vm.array.splice(k, 1)
                        break
                    }
                }
                console.log(vm.array)
            }
        }

        function _selected() {

            for (let i = 0; i < vm.array.length; i++) {
                let x = vm.array[i]
                for (let j = 0; j, j < vm.xray.length; j++) {
                    if (x == vm.xray[j].label.slice(0, -1)) {
                        vm.$sessionStorage.formData.xrayValue = vm.$sessionStorage.formData.xrayValue + vm.xray[j].value
                    }
                }

            }


            let x = 2 * vm.array.length
            vm.$sessionStorage.formData.xray = vm.array
            vm.$sessionStorage.formData.enum.push(x)
            // vm.$sessionStorage.formData.backBtn = $state.$current.toString().substring(5)
            vm.$sessionStorage.formData.totalValue = vm.$sessionStorage.formData.totalValue + vm.$sessionStorage.formData.xrayValue
            $state.go('wean.secretion')
        }

    }
})();