(function () {
    'use strict';

    angular.module('app.cbc').controller('Cbc', Cbc);

    Cbc.$inject = ['$scope', '$state', '$sessionStorage', 'factoryService'];

    function Cbc($scope, $state, $sessionStorage, factoryService) {
        var vm = this;

        vm.$state = $state
        vm.$sessionStorage = $sessionStorage

        vm.goBack = _goBack
        vm.enumCalc = _enumCalc

        vm.array = []
        vm.cbcHeader = 'White blood cell count'
        vm.cbc = [{
            "id": 19,
            "value": 1,
            "enum": 0,
            "link": "wean.infection",
            "label": "WBC <= 4"
        }, {
            "id": 20,
            "value": 5,
            "enum": 4,
            "link": "wean.infection",
            "label": "WBC 5 - 10"
        }, {
            "id": 21,
            "value": 3,
            "enum": 3,
            "link": "wean.infection",
            "label": "WBC 11 - 14"
        }, {
            "id": 19,
            "value": 1,
            "enum": 0,
            "link": "wean.infection",
            "label": "WBC >= 15"
        }, {
            "id": 21,
            "value": 0,
            "enum": 0,
            "link": "wean.infection",
            "label": "WBC result pending"
        }];

        activate();

        ////////////////

        function activate() {
            console.log('sub-state ' + vm.cbcHeader + ' loaded!')
             if (vm.$sessionStorage.formData.enum == undefined) {
                return vm.$state.go('wean.landing')
            }
        }

        function _goBack() {
            //vm.$state.go($sessionStorage.formData.backBtn)
            if(vm.$sessionStorage.formData.cbc != undefined){
                vm.$sessionStorage.formData.cbc = undefined
            }else{
                vm.$sessionStorage.formData.enum.pop()
                console.log(vm.$sessionStorage.formData.enum)
            }
            window.history.back()
        }

        function _enumCalc(e) {
            let x = e.enum
            vm.array.push(e);
            vm.$sessionStorage.formData.cbc = vm.array
            // $sessionStorage.formData.enum = x + $sessionStorage.formData.enum
            
            //factoryService.cbc(vm.array)
            // vm.$sessionStorage.formData.backBtn = $state.$current.toString().substring(5)
            if(vm.$sessionStorage.formData.cbc[0].label == 'WBC 5 - 10'){
                //vm.$sessionStorage.formData.infection = ['Cbc with in normal limits']
                let circle = x + 3
                vm.$sessionStorage.formData.enum.push(circle)
                vm.$state.go('wean.xray')
            }else{
                vm.$sessionStorage.formData.enum.push(x)
                vm.$state.go('wean.infection')
            }
            console.log($sessionStorage.formData)
        }
    }
})();