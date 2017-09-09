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
            "label": "Singular Lobular infiltrate?"
        }, {
            "id": 7,
            "value": 1,
            "enum": 2,
            "link": "wean.secretion",
            "label": "Multiple Lobular infiltrate?"
        }, {
            "id": 8,
            "value": 5,
            "enum": 4,
            "link": "wean.secretion",
            "label": "Clear of cardio/pulmonary abnormalities?"
        }, {
            "id": 9,
            "value": 0,
            "enum": 0,
            "link": "wean.secretion",
            "label": "No current Xray with in past 24 hours"
        }]

        activate()

        ////////////////

        function activate() {
            if(vm.$sessionStorage.formData.xrayValue != 0){
                vm.$sessionStorage.formData.totalValue = vm.$sessionStorage.formData.totalValue - vm.$sessionStorage.formData.xrayValue
                vm.$sessionStorage.formData.xrayValue = 0
            }
            if (vm.$sessionStorage.formData.enum == undefined) {
                return vm.$state.go('wean.landing')
            }
        }

        function _goBack() {
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
            vm.$sessionStorage.formData.enum.push(x)
            vm.$sessionStorage.formData.totalValue = vm.$sessionStorage.formData.totalValue + vm.$sessionStorage.formData.xrayValue
            vm.$state.go('wean.secretion')
        }
        
    }
})();