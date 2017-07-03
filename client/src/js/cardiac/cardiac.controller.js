(function () {
    'use strict';

    angular.module('app.cardiac').controller('Cardiac', Cardiac);

    Cardiac.$inject = ['$scope', '$state', '$sessionStorage','factoryService'];

    function Cardiac($scope, $state, $sessionStorage, factoryService) {
        var vm = this
        
        vm.$sessionStorage = $sessionStorage

        vm.goBack = _goBack
        vm.enumCalc = _enumCalc
        vm.selected = _selected
        vm.array = []
        vm.cardiacHeader = "Cardiac"
        vm.cardiac = [{
            "id": 10,
            "enum": 3,
            "link": "/",
            "label": "Blood pressure within normal limits?"
        }, {
            "id": 10,
            "enum": 2,
            "link": "/",
            "label": "BP low & stable on low dosage of vassopressor?"
        }, {
            "id": 10,
            "enum": 2,
            "link": "/",
            "label": "BP high & stable on low dosage of anti hypertensive medication?"
        }, {
            "id": 11,
            "enum": 4,
            "link": "/",
            "label": "Asymptomatic or NO arrythemias present?"
        }, {
            "id": 12,
            "enum": 3,
            "link": "/",
            "label": "Heart Rate ok?"
        }, {
            "id": 12,
            "enum": 3,
            "link": "/",
            "label": "MAP ok?"
        }];

        activate();

        ////////////////

        function activate() {
            //factoryService.lungs(vm.$sessionStorage.lungs)
            console.log('sub-state ' + vm.cardiacHeader + ' loaded!');
        }

        function _goBack() {
            window.history.back();
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
            let x = 2 * vm.array.length
            //factoryService.cardiac(vm.array)
            vm.$sessionStorage.formData.cardiac = vm.array
            $sessionStorage.formData.enum = x + $sessionStorage.formData.enum
            $state.go('wean.neuro')
            console.log($sessionStorage.formData)
        }

    }
})();