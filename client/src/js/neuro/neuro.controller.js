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

        vm.toggler = false
        vm.array = [];
        vm.neuroHeader = "Neuro";
        vm.neuro = [{
            "id": 0,
            "value": -4,
            "enum": 3,
            "label": "Altered level of conscious?"
        }, {
            "id": 1,
            "value": 0,
            "enum": 1,
            "label": "Seizure activity present?"
        }, {
            "id": 2,
            "value": 5,
            "enum": 3,
            "label": "Patient awake and following commands?"
        }, {
            "id": 3,
            "value": 0,
            "enum": 3,
            "label": "Diagnosed Neuromuscular Disease?"
        } 
        // {
        //     "id": 4,
        //     "value": 1,
        //     "enum": 3,
        //     "label": "Vital Capacity with in Normal Limits?"
        // }, {
        //     "id": 5,
        //     "value": 1,
        //     "enum": 3,
        //     "label": "NIF Within Normal Limits?"
        // }, {
        //     "id": 6,
        //     "value": -2,
        //     "enum": 3,
        //     "label": "Spirometry NOT performed?"
        // }
    ]
        
        activate()

        ////////////////

        function activate() {
            if(vm.$sessionStorage.formData.neuroValue != 0){
                vm.$sessionStorage.formData.totalValue = vm.$sessionStorage.formData.totalValue - vm.$sessionStorage.formData.neuroValue
                vm.$sessionStorage.formData.neuroValue = 0
            }
            if (vm.$sessionStorage.formData.enum == undefined) {
                return vm.$state.go('wean.landing')
            }
        }

        function _goBack() {
            if (this.$sessionStorage.formData.neuro != undefined) {
                this.$sessionStorage.formData.neuro = undefined
            } else {
                vm.$sessionStorage.formData.enum.pop()
            }
            window.history.back()
        }

        function _enumCalc(e) {

            if(e.id == 0){
                let i = vm.array.length;
                while (i--) {
                    if (vm.array[i] == 'Patient alert and following commands') {
                        vm.array.splice(i, 1);
                    }
                }
                vm.neuro[2].selected = false
            }

            if(e.id == 2){
                let i = vm.array.length;
                while (i--) {
                    if (vm.array[i] == 'Altered level of conscious') {
                        vm.array.splice(i, 1);
                    }
                }
                vm.neuro[0].selected = false
            }

            let x = e.label.slice(0, -1)
            if (vm.array.indexOf(x) == -1) {
                vm.array.push(x)
               
            } else {
                for (var i = vm.array.length - 1; i >= 0; i--) {
                    if (vm.array[i] === x) {
                        vm.array.splice(i, 1)
                        break
                    }
                }
               
            }
            // console.log(vm.array)
        }

        function _selected() {
            let uiSref
            for (let i = 0; i < vm.array.length; i++) {
                if (vm.array[i] == 'Diagnosed Neuromuscular Disease') {
                    uiSref = 'wean.neuromuscular'
                }else{
                    uiSref = 'wean.result'
                }
                let x = vm.array[i]
                for (let j = 0; j, j < vm.neuro.length; j++) {
                    if (x == vm.neuro[j].label.slice(0, -1)) {
                        vm.$sessionStorage.formData.neuroValue = vm.$sessionStorage.formData.neuroValue + vm.neuro[j].value
                    }
                }

            }

            console.log(uiSref)
            let x = 2 * vm.array.length
            vm.$sessionStorage.formData.neuro = vm.array
            vm.$sessionStorage.formData.enum.push(x)
            vm.$sessionStorage.formData.totalValue = vm.$sessionStorage.formData.totalValue + vm.$sessionStorage.formData.neuroValue
            $state.go(uiSref)
        }


    }
})();