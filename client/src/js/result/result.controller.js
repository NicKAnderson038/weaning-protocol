(function () {
    'use strict';

    angular.module('app.result').controller('Result', Result);

    Result.$inject = ['$scope', '$state', '$sessionStorage', 'factoryService'];

    function Result($scope, $state, $sessionStorage, factoryService) {
        var vm = this

        vm.$scope = $scope
        vm.$state = $state
        vm.$sessionStorage = $sessionStorage

        vm.test = _test
        // let total = vm.$sessionStorage.formData.enum.reduce(function (sum, value) {
        //     return sum + value;
        // }, 0);

        vm.resultHeader = "'result'";
        vm.timeBegin = vm.$sessionStorage.formData.timeBegin
        vm.timeEnd = {}

        let graph;
        vm.lineStacked = {
            "type": "serial",
            "categoryField": "category",
            "startDuration": 1,
            "categoryAxis": {
                "gridPosition": "start"
            },
            "trendLines": [],
            "graphs": [{
                    "balloonText": "[[title]] at [[category]]\nScore: [[value]]",
                    "bullet": "round",
                    // "lineColor": "#00CC00",
                    "id": "AmGraph-1",
                    "title": "Patient 1",
                    "valueField": "column1"
                },
                // {
                //     "balloonText": "[[title]] of [[category]]:[[value]]",
                //     "bullet": "square",
                //     "id": "AmGraph-2",
                //     "title": "graph 2",
                //     "valueField": "column2"
                // },
                // {
                //     "balloonText": "[[title]] of [[category]]:[[value]]",
                //     "bullet": "square",
                //     "id": "AmGraph-3",
                //     "title": "graph 3",
                //     "valueField": "column3"
                // }
            ],
            "guides": [],
            "valueAxes": [{
                "id": "ValueAxis-1",
                "stackType": "regular",
                "title": "Point Scale",
                "guides": [{
                    "value": 0,
                    "toValue": 15,
                    "lineAlpha": 0.8,
                    "lineColor": "#c00",
                    "fillColor": "#c00",
                    "fillAlpha": 0.2,
                    // "label": "Band #3",
                    "position": "right"
                }]
            }],
            "allLabels": [],
            "balloon": {},
            "legend": {
                "useGraphSettings": true
            },
            "titles": [{
                "id": "Title-1",
                "size": 15,
                "text": "Patient Charting Times"
            }],
            "data": [
                // {
                //     "category": "Day 1",
                //     "column1": 8,
                //     "column2": 5,
                //     "column3": 12
                // },
                // {
                //     "category": "Day 2",
                //     "column1": 6,
                //     "column2": 7,
                //     "column3": 4
                // }
            ]
        };

        // let dayColumn,
        //     objBuilder = [],
        //     //column1 = [8, 6, 2, 1, 2, 3, 6],
        //     //column2 = [5, 7, 3, 3, 1, 2, 8],
        //     column3 = [12, 4, 6, 6, 13, 5, 7]

        // console.log(`objBuilder quanity is currently ${objBuilder.length}`)
        // for (var x = 0; x < 7; x++) {
        //     dayColumn = x + 1
        //     objBuilder[x] = new Object({
        //         "category": `Day \n${dayColumn}`,
        //         //"column1": column1[x],
        //         //"column2": column2[x],
        //         "column3": column3[x]
        //     })
        //     console.log(objBuilder.length)
        //     if (objBuilder.length == 7) {
        //         console.log(objBuilder)
        //         vm.lineStacked.data = objBuilder
        //     }
        // }


        // let dataChunk = [10, 2, 5, 25, 20, 4, 2]
        // console.log('Graph Graph Graph Graph Graph Graph Graph Graph Graph Graph Graph Graph')

        // for (let key in vm.lineStacked.data) {
        //     console.log(`DataChunk in action ${vm.lineStacked.data[key]['column3']}`)
        // }








        activate();

        ////////////////

        function activate() {
            if (vm.$sessionStorage.formData.enum == undefined) {
                return vm.$state.go('wean.landing')
            }
            console.log($state.$current.includes["wean.result"])
            var t2 = new Date();
            var datestring2 = ("0" + (t2.getMonth() + 1)).slice(-2) + "-" + ("0" + t2.getDate()).slice(-2) + "-" + t2.getFullYear() + " " + ("0" + t2.getHours()).slice(-2) + ":" + ("0" + t2.getMinutes()).slice(-2);
            vm.timeEnd = datestring2;
            // vm.$sessionStorage.formData.xray = vm.array
            vm.$sessionStorage.formData.timeEnd = datestring2;
            // vm.$sessionStorage.formData.enum = total
            vm.$sessionStorage.formData.enum = vm.$sessionStorage.formData.totalValue
            console.log($sessionStorage.formData)
            vm.$sessionStorage.totalData.push($sessionStorage.formData)
            console.log(vm.$sessionStorage.totalData)


            let objBuilder = [],
                column1 = vm.$sessionStorage.totalData

            console.log(`objBuilder quanity is currently ${objBuilder.length}`)
            for (var x = 0; x < column1.length; x++) {

                let dataHolder1 = vm.$sessionStorage.totalData[x].timeBegin
                let dataHolder2 = dataHolder1.split(/[ ,]+/).filter(Boolean);

                let monthBuilder = dataHolder2[0].lastIndexOf('-'),
                    monthFinal = dataHolder2[0].substring(0, monthBuilder),
                    yearBuilder = dataHolder2[0].split('-'),
                    yearFinal = yearBuilder.pop();

                objBuilder[x] = new Object({
                    "category": `${dataHolder2[1]} \n${monthFinal} \n${yearFinal}`,
                    "column1": vm.$sessionStorage.totalData[x].enum
                })
                console.log(objBuilder.length)
                if (objBuilder.length == column1.length) {
                    console.log(objBuilder)
                    vm.lineStacked.data = objBuilder
                }
            }

            for (let key in vm.lineStacked.data) {
                console.log(`DataChunk in action ${vm.lineStacked.data[key]['column1']}`)
            }


        }


        function _test() {
            // for(let i = 0;i < $scope.lineStacked.data.length; i++){
            //     $scope.lineStacked.data[i]['column3'] = dataChunk[i]
            //     console.log(`DataChunk in action ${$scope.lineStacked.data[i]['column3']}`)
            // }

            for (let key in vm.lineStacked.data) {
                vm.lineStacked.data[key]['column3'] = dataChunk[key]
                console.log(`DataChunk in action ${vm.lineStacked.data[key]['column3']}`)
            }

        }


    }
})();