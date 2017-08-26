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

        vm.array = []
        vm.chestXrayHeader = "Chest X-ray"
        vm.chestXrayRecent = [{
            "id": 6,
            "value": 1,
            "enum": 1,
            "link": "wean.secretion",
            "label": "Any chest abnormalities present? (eg. Pulmonary Vascular Congestion? (aka - Pulmonary Edema), pneumothorax, significant pleural effusion, lung tumor.)"
        }, {
            "id": 4,
            "value": 0,
            "enum": 0,
            "link": "wean.secretion",
            "label": "Bilateral diffused pulmonary infiltrate?"
        }, {
            "id": 6,
            "value": 2,
            "enum": 2,
            "link": "wean.secretion",
            "label": "Lobular infiltrate?"
        }, {
            "id": 7,
            "value": 5,
            "enum": 4,
            "link": "wean.secretion",
            "label": "Clear chest X-ray?"
        }, {
            "id": 7,
            "value": 0,
            "enum": 0,
            "link": "wean.secretion",
            "label": "No current Xray with in past 24 hours"
        }]

        activate()

        ////////////////

        function activate() {
            console.log('sub-state ' + vm.chestXrayHeader + ' loaded!')
            if (vm.$sessionStorage.formData.enum == undefined) {
                return vm.$state.go('wean.landing')
            }
        }

        function _goBack() {
            // vm.$state.go($sessionStorage.formData.backBtn)
            if(vm.$sessionStorage.formData.xray != undefined){
                vm.$sessionStorage.formData.xray = undefined
            }else{
                vm.$sessionStorage.formData.enum.pop()
                console.log(vm.$sessionStorage.formData.enum)
            }
            window.history.back()
        }

        function _enumCalc(e) {
            let x = e.enum,
                y = e.value;
            vm.array.push(e)
            vm.$sessionStorage.formData.xray = vm.array
            vm.$sessionStorage.formData.xrayValue = y
            //factoryService.xray(vm.array)
            // vm.$sessionStorage.formData.enum = x + $sessionStorage.formData.enum
            vm.$sessionStorage.formData.enum.push(x)
            // vm.$sessionStorage.formData.backBtn = $state.$current.toString().substring(5)
            vm.$state.go('wean.secretion')
            console.log($sessionStorage.formData)
        }
        
    }
})();