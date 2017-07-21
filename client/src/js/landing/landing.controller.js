(function () {
    'use strict'

    angular.module('app.landing').controller('Landing', Landing)

    Landing.$inject = ['$scope', '$state', '$sessionStorage', 'FormDataModel', 'factoryService']

    function Landing($scope, $state, $sessionStorage, FormDataModel, factoryService) {
        var vm = this

        vm.$scope = $scope
        vm.$state = $state
        vm.$sessionStorage = $sessionStorage

        vm.selected = _selected

        vm.landingHeader = 'The Weaning Protocol';

        activate();

        ////////////////

        function activate() {
            console.log('sub-state ' + vm.landingHeader + ' loaded!')
            if(vm.$sessionStorage.formData.enum > 1){
                $sessionStorage.formData = new FormDataModel();
            }
            console.log($sessionStorage.formData)
        }

        function _selected() {
            if ($state.$current.includes["wean.landing"] === true) {
                
                console.log("Time stamp - Begin");
                var t1 = new Date()
                var datestring = ("0" + (t1.getMonth() + 1)).slice(-2) + "-" + ("0" + t1.getDate()).slice(-2) + "-" + t1.getFullYear() + " " + ("0" + t1.getHours()).slice(-2) + ":" + ("0" + t1.getMinutes()).slice(-2);
                //vm.$sessionStorage.timeBegin = datestring;
                //factoryService.timeBegin(vm.$sessionStorage.timeBegin)
              
                vm.$sessionStorage.formData.backBtn = $state.$current.toString().substring(5)
                vm.$sessionStorage.formData.timeBegin = datestring
                
                
                // console.log(FormDataModel.timeBegin)
                // this.formData = FormDataModel;
                // this.formData.timeBegin = vm.$sessionStorage.timeBegin
                // FormDataModel.timeBegin = this.formData.timeBegin
                // console.log(FormDataModel.timeBegin);
                // FormDataModel = function () {
                //     this.formData.timeBegin = vm.$sessionStorage.timeBegin
                //     console.log(this.formData.timeBegin)
                //     return this.formData.timeBegin
                // }

            } else if ($state.$current.includes["wean.infection"] === true) {
                console.log("Infection: Source");
                console.log(vm.valueInfection);
                vm.$sessionStorage.valueInfection = vm.valueInfection;
            } else if ($state.$current.includes["wean.result"] === true) {
                console.log("result");
                //console.log(vm.$sessionStorage.valueInfection);
            } else {
                return;
            }
        }


    }
})();