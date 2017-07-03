(function () {
        'use strict';

        angular.module('app.wean').controller('Wean', Wean);

        Wean.$inject = ['$scope', '$sessionStorage', 'FormDataModel'];
        function Wean($scope, $sessionStorage, FormDataModel) {
                var vm = this

                if($sessionStorage.totalData == undefined){
                        console.log('New session!! New session!! New session!! New session!! New session!! New session!! New session!!')
                        $sessionStorage.totalData = []
                }else{
                        console.log('Continued session!! Continued session!! Continued session!! Continued session!! Continued session!! Continued session!!')
                        console.log($sessionStorage.totalData)
                }
                          
                $sessionStorage.formData = new FormDataModel();
                console.log($sessionStorage.formData)
                vm.main = "Main 'wean' state";

                activate();

                ////////////////

                function activate() {
                        console.log(vm.main + ' loaded!');
                }
        }
})();