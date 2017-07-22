(function () {
    'use strict';

    angular.module('app.lungs').controller('Lungs', Lungs);

    Lungs.$inject = ['$scope', '$state', '$sessionStorage', 'factoryService', 'toastr'];

    function Lungs($scope, $state, $sessionStorage, factoryService, toastr) {
        var vm = this;

        vm.$scope = $scope
        vm.$state = $state
        vm.$sessionStorage = $sessionStorage
        vm.toastr = toastr

        vm.goBack = _goBack
        vm.toggle = _toggle
        vm.selected = _selected

        vm.disabled = true;
        vm.disabled2 = true;
        var disabled = true;
        var disabled2 = true;
        vm.array = [];
        vm.lungsHeader = "Lungs";
        vm.lungs = [{
            "id": 1,
            "enum": 64,
            "count": "",
            "symbol": " %",
            "link": "wean.result",
            "label": "FiO2",
            "button": false,
            "toggle": true
        }, 
        // {
        //     "id": 2,
        //     "enum": 64,
        //     "count": "",
        //     "symbol": " mL",
        //     "link": "wean.result",
        //     "label": "Vt",
        //     "button": true,
        //     "toggle": true
        // }, 
        {
            "id": 2,
            "enum": 128,
            "count": "",
            "symbol": " cmH2O",
            "link": "wean.result",
            "label": "PIP",
            "button": true,
            "toggle": true
        }, {
            "id": 3,
            "enum": 128,
            "count": "",
            "symbol": " cmH2O",
            "link": "wean.result",
            "label": "PEEP",
            "button": true,
            "toggle": true
        }, {
            "id": 4,
            "enum": 128,
            "count": "",
            "symbol": " cmH2O",
            "link": "wean.result",
            "label": "Platue",
            "button": true,
            "toggle": true
        }];

        activate();

        ////////////////

        function activate() {
            console.log('sub-state ' + vm.lungsHeader + ' loaded!')
            if (vm.$sessionStorage.formData.enum == undefined) {
                return vm.$state.go('wean.landing')
            }
        }
    }

    function _goBack() {
        // this.$state.go(this.$sessionStorage.formData.backBtn)
        if(this.$sessionStorage.formData.lungs != undefined){
                this.$sessionStorage.formData.lungs = undefined
            }
        window.history.back()
    }

    function _selected() {
        console.log(this.array)
        // this.$sessionStorage.lungs = this.array
        this.$sessionStorage.formData.lungs = this.array
        // this.$sessionStorage.formData.backBtn = this.$state.$current.toString().substring(5)
        this.$state.go('wean.cardiac')
    }

    function _toggle(x) {
        //if ($state.$current.includes["wean.lungs"] === true) {
        console.log(x);
        if (x.count == "") {
            //do nothing
        } else {
            this.array.push(x);
            console.log(this.array);
            // if(this.array.length == 5){
            //     factoryService.lungs(this.array)
            // }
        }
        console.log(x.toggle)
        console.log("meow")
        if (x.toggle) {
            console.log("open")
            console.log(x.count)
            this.disabled2 = false
            x.toggle = false
        } else if ((x.id === 1 && x.count.toString() != '100') && (x.count.length > 2 || x.count.length < 2 || x.count.charAt(0) === "0" || x.count.charAt(0) === "1")) {
            this.toastr.error("FiO2 is incorrect. \nRe-enter FiO2.", 'Error')
            return
        } else if (x.id === 1 && x.count.charAt(0) === "2" && x.count.charAt(1) === "0") {
            this.toastr.error('FiO2 20%? \nOnly possible in a hypoberic Chamber.', 'Error')
            return
        } 
        // else if (x.id === 2 && (x.count.length > 3 || x.count.length < 3 || x.count.charAt(0) === "0" || x.count.charAt(0) === "1" || x.count.charAt(0) === "9")) {
        //     toastr.error("Tidal Volume is incorrect. \nRe-enter Vt.");
        //     return;
        // } 
          else if (x.id === 2 && (x.count.length > 2 || x.count.length < 2 || x.count.charAt(0) === "0" || x.count.charAt(0) === "7" || x.count.charAt(0) === "8" || x.count.charAt(0) === "9")) {
            this.toastr.error("PIP is incorrect. \nRe-enter PIP.", 'Error');
            return;
        } else if (x.id === 3 && (x.count.length > 2 || x.count.length < 1 || x.count.charAt(1) === "3" || x.count.charAt(1) === "4" || x.count.charAt(1) === "5" || x.count.charAt(1) === "6" || x.count.charAt(1) === "7" || x.count.charAt(1) === "8" || x.count.charAt(1) === "9")) {
            this.toastr.error("PEEP is incorrect. \nRe-enter PEEP.", 'Error');
            return;
        } else if (x.id === 4 && (x.count.length > 2 || x.count.length < 1 || x.count.charAt(0) === "0")) {
            this.toastr.error("Platue Pressure is incorrect. \nRe-enter Platue.", 'Error');
            return;
        } else {
            console.log("close");
            console.log(x.count);
            this.disabled2 = true;
            x.toggle = true;
            if (x.id === 1) {
                this.lungs[1].button = this.lungs[1].button === true ? false : false;
            } else if (x.id === 2) {
                this.lungs[2].button = this.lungs[2].button === true ? false : false;
            } else if (x.id === 3) {
                this.lungs[3].button = this.lungs[3].button === true ? false : false;
            } 
            // else if (x.id === 4) {
            //     this.lungs[4].button = this.lungs[4].button === true ? false : false;
            // } 
            else {
                this.disabled = false;
            }
        }
        //}
    }
})();