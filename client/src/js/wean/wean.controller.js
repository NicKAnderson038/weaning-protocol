(function () {
        'use strict';

        angular.module('app.wean').controller('Wean', Wean);

        Wean.$inject = ['$scope', '$state', '$sessionStorage', 'FormDataModel', 'WeanService'];

        function Wean($scope, $state, $sessionStorage, FormDataModel, WeanService) {
                var vm = this

                vm.$state = $state
                vm.$sessionStorage = $sessionStorage

                if (vm.$sessionStorage.totalData == undefined || vm.$sessionStorage.totalData == null) {
                        vm.$sessionStorage.totalData = []
                        console.log(`New session!! New session!! New session!! New session!! ${vm.$sessionStorage.totalData}`)
                } else {
                        console.log(`Continued session!! Continued session!! Continued session!! ${vm.$sessionStorage.totalData}`)
                        console.log(vm.$sessionStorage.totalData)
                }

                vm.$sessionStorage.formData = new FormDataModel();
                console.log(vm.$sessionStorage.formData)

                vm.main = "Main 'wean' state";

                activate();

                ////////////////

                function activate() {
                        console.log(`${vm.main} loaded!`)
                        if (vm.$sessionStorage.formData.enum == undefined) {
                                return vm.$state.go('wean.landing')
                        }
                }

                WeanService.array.query(function(data){
                        console.log(data)
                        console.log({ firstName : "Bob" })
                })

                WeanService.obj.query(function(data){
                        console.log(data)
                        console.log(data.firstName)
                })

                
                

                /* END */
        }
})();