(function () {
    'use strict';

    angular.module('app.labs')
        .controller('Labs', Labs);

    Labs.$inject = ['$scope', '$state', '$sessionStorage', 'factoryService'];

    function Labs($scope, $state, $sessionStorage, factoryService) {
        var vm = this;

        vm.$scope = $scope
        vm.$state = $state
        vm.$sessionStorage = $sessionStorage

        vm.goBack = _goBack
        vm.enumCalc = _enumCalc
        vm.selected = _selected

        vm.labsHeader = 'Labs';
        vm.array = [];
        vm.labs = [{
                "id": 1,
                "selected": false,
                "label": "BUN 7 - 20?"
            },
            {
                "id": 2,
                "selected": false,
                "label": "Creatinine 0.6 - 1.4?"
            },
            {
                "id": 3,
                "selected": false,
                "label": "BNP < 100?"
            },
            {
                "id": 4,
                "selected": false,
                "label": "GFR > 60?"
            }
        ];

        activate();

        ////////////////

        function activate() {
            console.log('sub-state ' + vm.labsHeader + ' loaded!')
            if (vm.$sessionStorage.formData.enum == undefined) {
                return vm.$state.go('wean.landing')
            }
        }

        function _goBack() {
            // vm.$state.go($sessionStorage.formData.backBtn)
            if(vm.$sessionStorage.formData.labs != undefined){
                vm.$sessionStorage.formData.labs = undefined
            }else{
                vm.$sessionStorage.formData.enum.pop()
                console.log(vm.$sessionStorage.formData.enum)
            }
            window.history.back()  
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
            let x = vm.array.length,
                y = 4;
            //factoryService.labs(vm.array)
            // vm.$sessionStorage.formData.backBtn = $state.$current.toString().substring(5)
            vm.$sessionStorage.formData.labs = vm.array
            vm.$sessionStorage.formData.labsValue = (x * 2) + (y - x)
            // vm.$sessionStorage.formData.enum = x * $sessionStorage.formData.enum
            vm.$sessionStorage.formData.enum.push(x)
            console.log($sessionStorage.formData)
            vm.$state.go('wean.cbc')
        }

    }
})();