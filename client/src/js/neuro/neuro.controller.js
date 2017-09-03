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
            "id": 1,
            "value": -4,
            "enum": 3,
            "label": "Altered level of conscious?"
        }, {
            "id": 2,
            "value": 0,
            "enum": 1,
            "label": "Seizure activity present?"
        }, {
            "id": 3,
            "value": 5,
            "enum": 3,
            "label": "Patient alert and following commands?"
        }, {
            "id": 4,
            "value": false,
            "enum": 3,
            "label": "Neuromuscular Condition Present?"
        }]
        vm.neuromuscular = [{
            "id": 1,
            "value": 1,
            "enum": 3,
            "label": "Vital Capacity with in Normal Limits?"
        },{
            "id": 2,
            "value": 1,
            "enum": 3,
            "label": "NIF Within Normal Limits?"
        },{
            "id": 3,
            "value": -2,
            "enum": 3,
            "label": "Spirometry NOT performed?"
        }]

        activate();

        ////////////////

        function activate() {
            console.log('sub-state ' + vm.neuroHeader + ' loaded!')
            if (vm.$sessionStorage.formData.enum == undefined) {
                return vm.$state.go('wean.landing')
            }
        }

        function _goBack() {
            // vm.$state.go($sessionStorage.formData.backBtn)
            if(this.$sessionStorage.formData.neuro != undefined){
                this.$sessionStorage.formData.neuro = undefined
            }else{
                vm.$sessionStorage.formData.enum.pop()
                console.log(vm.$sessionStorage.formData.enum)
            }
            window.history.back()
        }

        function _enumCalc(e) {
            if(e.value == true){
                vm.toggler = false
                vm.neuro[4].value = true
            } else if(e.value == false){
                vm.toggler = true
                vm.neuro[4].value = false
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

            for(let i = 0; i < vm.array.length; i++){
                let x = vm.array[i]
                for(let j = 0; j , j < vm.neuro.length; j++){
                    if(x == vm.neuro[j].label.slice(0, -1)){
                        vm.$sessionStorage.formData.neuroValue = vm.$sessionStorage.formData.neuroValue + vm.neuro[j].value
                    }
                }

            }


            let x = 2 * vm.array.length
            //factoryService.neuro(vm.array)
            vm.$sessionStorage.formData.neuro = vm.array
            // vm.$sessionStorage.formData.enum = x + $sessionStorage.formData.enum
            vm.$sessionStorage.formData.enum.push(x)
            // vm.$sessionStorage.formData.backBtn = $state.$current.toString().substring(5)
            $state.go('wean.result')
            console.log($sessionStorage.formData)
        }

    }
})();