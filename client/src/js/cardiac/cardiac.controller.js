(function () {
        'use strict';

        angular.module('app.cardiac').controller('Cardiac', Cardiac);

        Cardiac.$inject = ['$scope', '$state', '$sessionStorage', 'factoryService'];

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
                    "id": 1,
                    "value": 2,
                    "enum": 3,
                    "label": "Normal BP without Vasopressor?"
                }, {
                    "id": 2,
                    "value": 0,
                    "enum": 2,
                    "label": "Normotensive or stable BP on LOW dosage of Vasopressor?"
                },
                // {
                //     "id": 10,
                //     "enum": 1,
                //     "link": "/",
                //     "label": "BP on HIGH dosage of anti hypertensive medication?"
                // }, 
                {
                    "id": 3,
                    "value": 1,
                    "enum": 3,
                    "label": "Normal Sinus Rhythm?"
                }, {
                    "id": 4,
                    "value": 0,
                    "enum": 3,
                    "label": "Diagnosed Pulmonary Hypertension?"
                }
            ]

            activate();

            ////////////////

            function activate() {
                if (vm.$sessionStorage.formData.cardiacValue != 0) {
                    vm.$sessionStorage.formData.totalValue = vm.$sessionStorage.formData.totalValue - vm.$sessionStorage.formData.cardiacValue
                    vm.$sessionStorage.formData.cardiacValue = 0
                }
                if (vm.$sessionStorage.formData.enum == undefined) {
                    return vm.$state.go('wean.landing')
                }
            }

            function _goBack() {
                // vm.$state.go($sessionStorage.formData.backBtn)
                if (this.$sessionStorage.formData.cardiac != undefined) {
                    this.$sessionStorage.formData.cardiac = undefined
                } else {
                    vm.$sessionStorage.formData.enum.pop()
                    console.log(vm.$sessionStorage.formData.enum)
                }
                window.history.back()
            }


            function _enumCalc(e) {
                let i = vm.array.length
                if (e.id == 1) {
                    while (i--) {
                        if (vm.array[i] == 'Normotensive or stable BP on LOW dosage of Vasopressor' ||
                            vm.array[i] == 'Diagnosed Pulmonary Hypertension') {
                            vm.array.splice(i, 1);
                        }
                    }
                    vm.cardiac[1].selected = false
                    vm.cardiac[3].selected = false
                }

                if (e.id == 2 || e.id == 4) {
                    while (i--) {
                        if (vm.array[i] == 'Normal BP without Vasopressor') {
                            vm.array.splice(i, 1);
                        }
                    }
                    vm.cardiac[0].selected = false
                }


                // let x = e.split('?').join('')
                // if (vm.array.indexOf(x) == -1) {
                //     vm.array.push(x)
                //     console.log(vm.array)
                // } else {
                //     for (var k = vm.array.length - 1; k >= 0; k--) {
                //         if (vm.array[k] === x) {
                //             vm.array.splice(k, 1)
                //             break   
                //         }
                //     }
                //     console.log(vm.array)
                // }
                let x = e.label.slice(0, -1)
                if (vm.array.indexOf(x) == -1) {
                    vm.array.push(x)
                } else {
                    for (let k = vm.array.length - 1; k >= 0; k--) {
                        if (vm.array[k] === x) {
                            vm.array.splice(k, 1)
                            break
                        }
                    }
                }
            
        }

        function _selected() {

            for (let i = 0; i < vm.array.length; i++) {
                let x = vm.array[i]
                for (let j = 0; j, j < vm.cardiac.length; j++) {
                    if (x == vm.cardiac[j].label.slice(0, -1)) {
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
            vm.$sessionStorage.formData.totalValue = vm.$sessionStorage.formData.totalValue + vm.$sessionStorage.formData.cardiacValue
        }

    }
})();