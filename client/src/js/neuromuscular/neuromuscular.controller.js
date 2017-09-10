(function () {
    'use strict';

    angular.module('app.neuromuscular').controller('Neuromuscular', Neuromuscular);

    Neuromuscular.$inject = ['$scope', '$state', '$sessionStorage', 'factoryService'];

    function Neuromuscular($scope, $state, $sessionStorage, factoryService) {
        var vm = this

        vm.$state = $state
        vm.$sessionStorage = $sessionStorage

        vm.goBack = _goBack
        vm.enumCalc = _enumCalc
        vm.selected = _selected

        vm.toggler = false
        vm.array = []
        vm.neuromuscularHeader = "Neuromuscular"
        vm.neuromuscular = [ 
        {
            "id": 0,
            "value": 1,
            "enum": 3,
            "label": "Vital Capacity with in Normal Limits?"
        }, {
            "id": 1,
            "value": 1,
            "enum": 3,
            "label": "NIF Within Normal Limits?"
        }, {
            "id": 2,
            "value": -2,
            "enum": 3,
            "label": "Spirometry NOT performed?"
        }]

        activate()

        ////////////////

        function activate() {
            if(vm.$sessionStorage.formData.neuromuscularValue != 0){
                vm.$sessionStorage.formData.totalValue = vm.$sessionStorage.formData.totalValue - vm.$sessionStorage.formData.neuromuscularValue
                vm.$sessionStorage.formData.neuromuscularValue = 0
            }
            if (vm.$sessionStorage.formData.enum == undefined) {
                return vm.$state.go('wean.landing')
            }
        }

        function _goBack() {
            if (this.$sessionStorage.formData.neuromuscular != undefined) {
                this.$sessionStorage.formData.neuromuscular = undefined
            } else {
                vm.$sessionStorage.formData.enum.pop()
                console.log(vm.$sessionStorage.formData.enum)
            }
            window.history.back()
        }

        function _enumCalc(e) {

            if(e.id == 2){
                let i = vm.array.length;
                while (i--) {
                    if (vm.array[i] == 'Vital Capacity with in Normal Limits' || vm.array[i] == 'NIF Within Normal Limits') {
                        vm.array.splice(i, 1);
                    }
                }
                vm.neuromuscular[0].selected = false
                vm.neuromuscular[1].selected = false
            }

            if(e.id == 0 || e.id == 1){
                let i = vm.array.length;
                while (i--) {
                    if (vm.array[i] == 'Spirometry NOT performed') {
                        vm.array.splice(i, 1);
                    }
                }
                vm.neuromuscular[2].selected = false
            }

            let x = e.label.slice(0, -1)
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

            for (let i = 0; i < vm.array.length; i++) {
                let x = vm.array[i]
                for (let j = 0; j, j < vm.neuromuscular.length; j++) {
                    if (x == vm.neuromuscular[j].label.slice(0, -1)) {
                        vm.$sessionStorage.formData.neuromuscularValue = vm.$sessionStorage.formData.neuromuscularValue + vm.neuromuscular[j].value
                    }
                }

            }


            let x = 2 * vm.array.length
            vm.$sessionStorage.formData.neuromuscular = vm.array
            vm.$sessionStorage.formData.enum.push(x)
            $state.go('wean.result')

            vm.$sessionStorage.formData.totalValue = vm.$sessionStorage.formData.totalValue + vm.$sessionStorage.formData.neuromuscularValue
        }


    }
})();