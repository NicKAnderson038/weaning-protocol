(function () {
    'use strict';

    angular.module('app.lab-values').controller('LabValues', LabValues);

    LabValues.$inject = ['$scope', '$state', '$sessionStorage', 'factoryService', 'toastr'];

    function LabValues($scope, $state, $sessionStorage, factoryService, toastr) {
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
        //vm.input_box_lg = ''
        vm.array = [];
        vm.labValuesHeader = "Lab Values";
        vm.lab_values = [{
                "id": 1,
                "enum": 64,
                "count": "",
                "symbol": "",
                "link": "wean.result",
                "label": "Bun",
                "button": false,
                "toggle": true
            },
            {
                "id": 2,
                "enum": 64,
                "count": "",
                "symbol": "",
                "link": "wean.result",
                "label": "Creatine",
                "button": true,
                "toggle": true
            },
            {
                "id": 3,
                "enum": 128,
                "count": "",
                "symbol": "",
                "link": "wean.result",
                "label": "BNP",
                "button": true,
                "toggle": true
            },
            {
                "id": 4,
                "enum": 128,
                "count": "",
                "symbol": "",
                "link": "wean.result",
                "label": "GFR",
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
                "symbol": "",
                "link": "wean.result",
                "label": "WBC",
                "button": true,
                "toggle": true
            }
        ];

        vm.wbc = {
            "id": 1,
            "selected": false,
            "label": "WBC Unknown?"
        }

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
        if (this.$sessionStorage.formData.lab_values != undefined) {
            this.$sessionStorage.formData.lab_values = undefined
        }
        window.history.back()
    }

    function _selected() {
        count = parseFloat(this.lab_values[4].count)
        this.$sessionStorage.formData.lab_values = this.array

        this.$sessionStorage.formData.dynamicCompliance = this.array[1].count / (this.array[3].count - this.array[2].count)
        this.$sessionStorage.formData.staticCompliance = this.array[1].count / (this.array[4].count - this.array[2].count)

        if (this.lab_values[4].id === 5 && (count <= 4) || (count >= 15)) {
            this.$state.go('wean.infection')
        } else {
            this.$state.go('wean.xray')
        }


    }


    function _toggle(x) {
        //if ($state.$current.includes["wean.lab_values"] === true) {
        console.log(x);
        console.log(x.count)

        if (x.count != "") {
            count = parseFloat(x.count)
        }


        if (x.count == "") {
            //do nothing
            //vm.input_box_lg = ""
        } else {
            this.array.push(x);
            //vm.input_box_lg = vm.input_box_lg + x.count
            // console.log(this.array)
        }
        // console.log(x.toggle)
        if (x.toggle) {
            // console.log("open")
            // console.log(this.labValues)
            //console.log(x.count)



            this.disabled2 = false
            x.toggle = false
        } else if (x.id === 1 && ((count < 0))) {
            this.toastr.error("Bun can not be negative. \nRe-enter Bun.", 'Error')
            return
        } else if (x.id === 1 && (count > 99)) {
            this.toastr.error('Bun can not be greater than a 100 \nRe-enter Bun.', 'Error')
            return
        } else if (x.id === 2 && (count < 0)) {
            this.toastr.error("Creatine can not be negative. \nRe-enter Creatine.", 'Error')
            return;
        } else if (x.id === 2 && (count > 99)) {
            this.toastr.error('Creatine can not be greater than a 100 \nRe-enter Creatine.', 'Error')
            return;
        } else if (x.id === 3 && (count < 0)) {
            this.toastr.error("BNP is incorrect. \nRe-enter BNP.", 'Error')
            return;
        } else if (x.id === 4 && (count < 0)) {
            this.toastr.error("GFR is incorrect. \nRe-enter GFR.", 'Error')
            return;
        } else {
            // console.log("close");
            // console.log(x.count);
            this.disabled2 = true;
            x.toggle = true;
            if (x.id === 1) {
                this.lab_values[1].button = this.lab_values[1].button === true ? false : false;
            } else if (x.id === 2) {
                this.lab_values[2].button = this.lab_values[2].button === true ? false : false;
            } else if (x.id === 3) {
                this.lab_values[3].button = this.lab_values[3].button === true ? false : false;
            } else if (x.id === 4) {
                this.lab_values[4].button = this.lab_values[4].button === true ? false : false;
            } else {
                this.disabled = false;
            }
        }
        //}
    }
})();