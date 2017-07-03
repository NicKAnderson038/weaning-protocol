'use strict';
angular.module('app.amchartDirective.serial', [])
        .directive('amchartSerial', function () {
            return {
                replace: true,
                scope: {
                    options: '=ngModel'
                },
                templateUrl: 'js/components/amchartDirective/template/amcharts.html',
                link: function (scope, $el) {
                    //Generating a uid to place on the element
                    var guid = function guid() {
                        function s4() {
                            return Math.floor((1 + Math.random()) * 0x10000)
                                    .toString(16)
                                    .substring(1);
                        }
                        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                                s4() + '-' + s4() + s4() + s4();
                    };

                    var id = guid();
                    $el.attr('id', id);
                    var chart;

                    if (scope.options) {
                        //Function that renders the graphic on the screen
                        var renderChart = function (amChartOptions) {
                            var option = amChartOptions || scope.options;
                            //Instantiating the serial chart
                            chart = new AmCharts.AmSerialChart();
                            chart.dataProvider = option.data;

                            //Placing in the chart object all the properties that come in the option
                            var chartKeys = Object.keys(option);
                            for (var i = 0; i < chartKeys.length; i++) {
                                if (typeof option[chartKeys[i]] !== 'object' && typeof option[chartKeys[i]] !== 'function') {
                                    chart[chartKeys[i]] = option[chartKeys[i]];
                                } else {
                                    chart[chartKeys[i]] = angular.copy(option[chartKeys[i]]);
                                }
                            }
                            //Amchart object method to render the chart
                            chart.write(id);
                        };

                        renderChart();
                        scope.$watch('options', function (newValue, oldValue) {
                            if (id === $el[0].id || !id) {
                                renderChart(newValue);
                            }
                        }, true);
                    }

                }
            };
        });