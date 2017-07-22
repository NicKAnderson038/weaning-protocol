(function () {
    'use strict';

    angular.module('app.contra').controller('Contra', Contra)

    Contra.$inject = ['$scope', '$state', '$sessionStorage'];

    function Contra($scope, $state, $sessionStorage) {
        var vm = this

        vm.$state = $state
        vm.$sessionStorage = $sessionStorage
        vm.selected = _selected
        vm.goBack = _goBack
        vm.contraindicationsHeader = 'Screening for Weaning';

        vm.contraindications = [{
            "id": 1,
            "selected": false,
            "label": "PaO2/fiO2 ration < 150?"
        }, {
            "id": 2,
            "selected": false,
            "label": "fiO2 > 50% and Peep >= 8?"
        }, {
            "id": 3,
            "selected": false,
            "label": "Patient scheduled for surgery"
        }, {
            "id": 4,
            "selected": false,
            "label": "Patient on a High dosage of Vasopressor?"
        }, {
            "id": 5,
            "selected": false,
            "label": "Patient Unconscious and Unresponsive?"
        }];

        activate();

        ////////////////

        function activate() {
            console.log('sub-state ' + vm.contraindicationsHeader + ' loaded!')
            if (vm.$sessionStorage.formData.enum == undefined) {
                return vm.$state.go('wean.landing')
            }
            console.log(vm.$sessionStorage.formData)
        }

        function _selected() {
		    // vm.$sessionStorage.formData.backBtn = $state.$current.toString().substring(5)
            vm.$state.go('wean.labs')	
	    }

        function _goBack() {
            // vm.$state.go(vm.$sessionStorage.formData.backBtn)
            window.history.back()
            console.log(vm.$sessionStorage.formData)
        }

    }
})();