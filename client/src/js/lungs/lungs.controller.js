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
        {
            "id": 2,
            "enum": 64,
            "count": "",
            "symbol": " mL",
            "link": "wean.result",
            "label": "Vt",
            "button": true,
            "toggle": true
        },
        {
            "id": 3,
            "enum": 128,
            "count": "",
            "symbol": " cmH2O",
            "link": "wean.result",
            "label": "PEEP",
            "button": true,
            "toggle": true
        }, 
        {
            "id": 4,
            "enum": 128,
            "count": "",
            "symbol": " cmH2O",
            "link": "wean.result",
            "label": "PIP",
            "button": true,
            "toggle": true
        }, 
        // {
        //     "id": 4,
        //     "enum": 128,
        //     "count": "",
        //     "symbol": " cmH2O",
        //     "link": "wean.result",
        //     "label": "PEEP",
        //     "button": true,
        //     "toggle": true
        // }, 
        {
            "id": 5,
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
            if (vm.$sessionStorage.formData.enum == undefined) {
                return vm.$state.go('wean.landing')
            }
        }
    }

    let count
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

        this.$sessionStorage.formData.dynamicCompliance = this.array[1].count / (this.array[3].count - this.array[2].count)
        this.$sessionStorage.formData.staticCompliance = this.array[1].count / (this.array[4].count - this.array[2].count)

        this.$state.go('wean.cardiac')
    }

    function _toggle(x) {
        //if ($state.$current.includes["wean.lungs"] === true) {
        console.log(x);

        if (x.count != "") {
            count = parseFloat(x.count)
        }

        if (x.count == "") {
            //do nothing
        } else {
            this.array.push(x);
            console.log(this.array);
            // if(this.array.length == 5){
            //     factoryService.lungs(this.array)
            // }
        }
        // console.log(x.toggle)
        if (x.toggle) {
            // console.log("open")
            // console.log(this.lungs)
            // console.log(x.count)
            this.disabled2 = false
            x.toggle = false
        } else if (x.id === 1 && (count > 100)) {
            this.toastr.error("FiO2 is incorrect. \nRe-enter FiO2.", 'Error')
            return
        } else if (x.id === 1 && (count <= 20)) {
            this.toastr.error(`FiO2 ${count}? \nOnly possible in a hypoberic Chamber.`, 'Error')
            return
        } else if (x.id === 2 && ((count > 1200) || (count < 150))) {
            toastr.error("Tidal Volume is incorrect. \nRe-enter Vt.");
            return;
        } else if (x.id === 3 && ((count > 20) || (count < 2))) {
            this.toastr.error("PEEP is incorrect. \nRe-enter PEEP.", 'Error');
            return;
        } else if (x.id === 4 && (count <= 10)) {
            this.toastr.warning("PIP is too low. \nCheck Vent & cuff for leak.", 'Warning');
            return;
        } else if (x.id === 4 && (count > 45)) {
            this.toastr.warning("PIP is too high. \nCheck Vent, circut or patient for an obstruction.", 'Warning');
            return;
        }else if (x.id === 5 && ((count > 30) || (count < 2))) {
            this.toastr.error("Platue Pressure is incorrect. \nRe-enter Platue.", 'Error');
            return;
        } else if (x.id === 5 && ((parseFloat(this.lungs[3].count)) <= count)) {
            this.toastr.error("Platue cannot be greater or equal to PIP. \nRe-enter Platue.", 'Error');
            return;
        } else if (x.id === 5 && (((parseFloat(this.lungs[3].count)) < 15) && (count < 5))) {
            this.toastr.error("If PIP is less than 15, then Platue cannot be less than 5. \nCheck patient and ventilator for an issue.", 'Error');
            return;
        }else {
            // console.log("close");
            // console.log(x.count);
            this.disabled2 = true;
            x.toggle = true;
            if (x.id === 1) {
                this.lungs[1].button = this.lungs[1].button === true ? false : false;
            } else if (x.id === 2) {
                this.lungs[2].button = this.lungs[2].button === true ? false : false;
            } else if (x.id === 3) {
                this.lungs[3].button = this.lungs[3].button === true ? false : false;
            } else if (x.id === 4) {
                this.lungs[4].button = this.lungs[4].button === true ? false : false;
            } else {
                this.disabled = false;
            }
        }
        //}
    }
})();