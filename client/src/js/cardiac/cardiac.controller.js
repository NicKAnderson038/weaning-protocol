(function () {
    'use strict';

    angular.module('app.cardiac').controller('Cardiac', Cardiac);

    Cardiac.$inject = ['$scope', '$state', '$sessionStorage','factoryService'];

    function Cardiac($scope, $state, $sessionStorage, factoryService) {
        var vm = this
        
        vm.$state = $state
        vm.$sessionStorage = $sessionStorage

        vm.goBack = _goBack
        vm.enumCalc = _enumCalc
        vm.selected = _selected

        vm.array = []
        vm.cardiacHeader = "Cardiac"
        vm.cardiac = [{
            "id": 10,
            "value": 2,
            "enum": 3,
            "link": "/",
            "label": "BP within normal limits?"
        }, {
            "id": 10,
            "value": -1,
            "enum": 2,
            "link": "/",
            "label": "BP on LOW dosage of vassopressor?"
        }, 
        // {
        //     "id": 10,
        //     "enum": 1,
        //     "link": "/",
        //     "label": "BP on HIGH dosage of anti hypertensive medication?"
        // }, 
        {
            "id": 11,
            "value": 2,
            "enum": 3,
            "link": "/",
            "label": "Asymptomatic or NO arrythemias present?"
        }, {
            "id": 12,
            "value": 2,
            "enum": 3,
            "link": "/",
            "label": "MAP within normal limits?"
        }];

        activate();

        ////////////////

        function activate() {
            console.log('sub-state ' + vm.cardiacHeader + ' loaded!')
            if (vm.$sessionStorage.formData.enum == undefined) {
                return vm.$state.go('wean.landing')
            }
        }

        function _goBack() {
            // vm.$state.go($sessionStorage.formData.backBtn)
            if(this.$sessionStorage.formData.cardiac != undefined){
                this.$sessionStorage.formData.cardiac = undefined
            }else{
                vm.$sessionStorage.formData.enum.pop()
                console.log(vm.$sessionStorage.formData.enum)
            }
            window.history.back()
        }

        // function _enumCalc(e) {
        //     e = e.split('?').join('');
        //     vm.array.push(e);
        //     console.log(vm.array);
        // }
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
            for(let i = 0; i < vm.array.length; i++){
                let x = vm.array[i]
                for(let j = 0; j , j < vm.cardiac.length; j++){
                    if(x == vm.cardiac[j]){
                        vm.$sessionStorage.formData.cardiacValue = vm.$sessionStorage.formData.cardiacValue + vm.cardiac[j].value
                    }
                }

            }



            let x = 2 * vm.array.length
            //factoryService.cardiac(vm.array)
            vm.$sessionStorage.formData.cardiac = vm.array
            // vm.$sessionStorage.formData.enum = x + $sessionStorage.formData.enum
            vm.$sessionStorage.formData.enum.push(x)
            // vm.$sessionStorage.formData.backBtn = $state.$current.toString().substring(5)
            $state.go('wean.neuro')
            console.log($sessionStorage.formData)
        }

    }
})();