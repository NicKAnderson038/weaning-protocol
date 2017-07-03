'use strict';
angular.module('AngularAmChart', [])
        .directive('amchart', function () {
            return {
                replace: true,
                scope: {
                    options: '=ngModel'
                },
                template: "<div class='amchart' style='width: 100%; height: 400px;'></div>",
                link: function (scope, $el) {
                    //Gerando um uid para colocar no elemento
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

                    //Função que renderiza o gráfico na tela
                    var renderChart = function (amChartOptions) {
                        var option = amChartOptions || scope.options;
                        if (scope.options) {

                            //verificando qual tipo é o gráfico
                            switch (option.type) {
                                case "serial":
                                    chart = new AmCharts.AmSerialChart();
                                    chart = option.theme ? new AmCharts.AmSerialChart(AmCharts.themes[option.theme]) : new AmCharts.AmSerialChart();
                                    break;
                                case "pie":
                                    chart = new AmCharts.AmPieChart();
                                    chart = option.theme ? new AmCharts.AmPieChart(AmCharts.themes[option.theme]) : new AmCharts.AmPieChart();
                                    break;
                                case "funnel":
                                    chart = new AmCharts.AmFunnelChart();
                                    chart = option.theme ? new AmCharts.AmFunnelChart(AmCharts.themes[option.theme]) : new AmCharts.AmFunnelChart();
                                    break;
                                case "gauge":
                                    chart = new AmCharts.AmAngularGauge();
                                    chart = option.theme ? new AmCharts.AmAngularGauge(AmCharts.themes[option.theme]) : new AmCharts.AmAngularGauge();
                                    break;
                                case "radar":
                                    chart = new AmCharts.AmRadarChart();
                                    chart = option.theme ? new AmCharts.AmRadarChart(AmCharts.themes[option.theme]) : new AmCharts.AmRadarChart();
                                    break;
                                case "xy":
                                    chart = new AmCharts.AmXYChart();
                                    chart = option.theme ? new AmCharts.AmXYChart(AmCharts.themes[option.theme]) : new AmCharts.AmXYChart();
                                    break;
                            }

                            chart.dataProvider = option.data;

                            //Colocando no objeto chart todos as propriedades que vierem no option
                            var chartKeys = Object.keys(option);
                            for (var i = 0; i < chartKeys.length; i++) {
                                if (chartKeys[i] !== "theme") {
                                    if (typeof option[chartKeys[i]] !== 'object' && typeof option[chartKeys[i]] !== 'function') {
                                        chart[chartKeys[i]] = option[chartKeys[i]];
                                    } else {
                                        chart[chartKeys[i]] = angular.copy(option[chartKeys[i]]);
                                    }
                                }
                            }
                            //Método do objeto Amchart para rendererizar o gráfico
                            chart.write(id);
                        }
                    };

                    renderChart(scope.options);
                    scope.$watch('options', function (newValue, oldValue) {
                        if (id === $el[0].id || !id) {
                            renderChart(newValue);
                        }
                    }, true);

                }
            };
        });