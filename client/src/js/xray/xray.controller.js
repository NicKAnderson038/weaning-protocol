(function () {
    'use strict';

    angular.module('app.xray').controller('Xray', Xray)

    Xray.$inject = ['$state', '$sessionStorage', 'factoryService']

    function Xray($state, $sessionStorage, factoryService) {
        var vm = this;

        vm.$sessionStorage = $sessionStorage

        vm.goBack = _goBack
        vm.enumCalc = _enumCalc
        vm.array = []
        vm.chestXrayHeader = "Chest X-ray"
        vm.chestXrayRecent = [{
            "id": 6,
            "enum": 1,
            "link": "wean.secretion",
            "label": "Any chest abnormalities present? (eg. Pulmonary Vascular Congestion? (aka - Pulmonary Edema), pneumothorax, significant pleural effusion, lung tumor.)"
        }, {
            "id": 4,
            "enum": 0,
            "link": "wean.secretion",
            "label": "Bilateral diffused pulmonary infiltrate?"
        }, {
            "id": 6,
            "enum": 2,
            "link": "wean.secretion",
            "label": "Lobular infiltrate?"
        }, {
            "id": 7,
            "enum": 4,
            "link": "wean.secretion",
            "label": "Clear chest X-ray?"
        }, {
            "id": 7,
            "enum": 0,
            "link": "wean.secretion",
            "label": "No current Xray with in past 24 hours"
        }]

        activate()

        ////////////////

        function activate() {
            console.log('sub-state ' + vm.chestXrayHeader + ' loaded!')
        }

        function _goBack() {
            window.history.back()
        }

        function _enumCalc(e) {
            let x = e.enum
            vm.array.push(e)
            vm.$sessionStorage.formData.xray = vm.array
            //factoryService.xray(vm.array)
            $sessionStorage.formData.enum = x + $sessionStorage.formData.enum
            console.log($sessionStorage.formData)
        }
        
    }
})();