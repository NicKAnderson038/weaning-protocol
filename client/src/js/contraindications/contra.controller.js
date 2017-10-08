(function () {
    'use strict';

    angular.module('app.contra').controller('Contra', Contra)

    Contra.$inject = ['$scope', '$state', '$sessionStorage'];

    function Contra($scope, $state, $sessionStorage) {
        var vm = this

        vm.$state = $state
        vm.$sessionStorage = $sessionStorage
        vm.enumCalc = _enumCalc
        vm.selected = _selected
        vm.goBack = _goBack
        vm.contraindicationsHeader = 'Screening for Weaning'
        vm.array = []

        vm.contraindications = [{
            "id": 1,
            "selected": false,
            "label": "PaO2/fiO2 ration < 150?"
        }, {
            "id": 2,
            "selected": false,
            "label": "fiO2 > 50% and Peep > 8?"
        }, {
            "id": 3,
            "selected": false,
            "label": "Patient scheduled for surgery?"
        }, {
            "id": 4,
            "selected": false,
            "label": "Patient on a High dosage of Vasopressor?"
        }, {
            "id": 5,
            "selected": false,
            "label": "Patient Unconscious and Unresponsive?"
        }]

        activate()

        ////////////////

        function activate() {
            if (vm.$sessionStorage.formData.enum == undefined) {
                return vm.$state.go('wean.landing')
            }
            console.log(vm.$sessionStorage.formData)
        }

        // function _selected() {
		//     // vm.$sessionStorage.formData.backBtn = $state.$current.toString().substring(5)
        //     vm.$state.go('wean.labs')	
	    // }

        function _goBack() {
            // vm.$state.go(vm.$sessionStorage.formData.backBtn)
            window.history.back()
            console.log(vm.$sessionStorage.formData)
        }

        function _enumCalc(e) {
            let x = e.split('?').join('')
            if (vm.array.indexOf(x) == -1) {
                vm.array.push(x)
            } else {
                for (var i = vm.array.length - 1; i >= 0; i--) {
                    if (vm.array[i] === x) {
                        vm.array.splice(i, 1)
                        break   
                    }
                }
            }
            console.log(vm.array.length)
        }

        function _selected() {
            let x = vm.array.length
            if(vm.array.length > 0){
                vm.$state.go('wean.fail')
            }else{
                vm.$state.go('wean.lab-values')
            }           
            
        }

    }
})();