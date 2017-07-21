(function () {
    'use strict';

    angular.module('app.infection').controller('Infection', Infection);

    Infection.$inject = ['$state', '$sessionStorage','factoryService'];

    function Infection($state, $sessionStorage, factoryService) {
        var vm = this;

        vm.$state = $state
        vm.$sessionStorage = $sessionStorage

        vm.goBack = _goBack
        vm.enumCalc = _enumCalc
        vm.selected = _selected

        vm.sourceHeader = "Source of Infection"
        vm.array = []
        vm.infection = [{
            "id": 14,
            "enum": 2097152,
            "label": "Blood infection?",
            "selected": false
        }, {
            "id": 15,
            "enum": 4194304,
            "label": "Respiratory infection?",
            "selected": false
        }, {
            "id": 16,
            "enum": 8386808,
            "label": "Urine infection?",
            "selected": false
        }, {
            "id": 17,
            "enum": 16777216,
            "label": "Other?",
            "selected": false
        }, {
            "id": 18,
            "enum": 33554432,
            "label": "Unknown or result pending?",
            "selected": false
        }];

        activate();

        ////////////////

        function activate() {
            console.log('sub-state ' + vm.sourceHeader + ' loaded!')
            if(vm.$sessionStorage.formData.backBtn.indexOf('wean') == -1){
                vm.$state.go('wean.landing')
            }
        }

        function _goBack() {
            vm.$state.go($sessionStorage.formData.backBtn)
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
            //factoryService.infection(vm.array)
            vm.$sessionStorage.formData.infection = vm.array
            vm.$sessionStorage.formData.backBtn = $state.$current.toString().substring(5)
            console.log($sessionStorage.formData)
            vm.$state.go('wean.xray')
        }
    }
})();