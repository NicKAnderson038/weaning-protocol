AngularJs com AmCharts
====
Introdução
---
Módulo do AmChart para utilizar com o AngularJS.
Muito Simples!!!!

Fácil utilização
---
A forma de você utilizar esse módulo é muito simples!

O nome do módulo é [AngularAmChart]

Coloque o módulo em suas dependências no bower.js

~~~javascript
{
  "angular-amchart":"~1.0.5"
}
~~~

Depois utilize o arquivo

/bower_components/angular-amchart/src/amchart.js


Olhe o exemplo abaixo:
* Gráfico de type serial(Todos eles bar, column, area...)

~~~html
<!--HTML-->
<h3>Serial Area Stacked</h3>
<amchart ng-model='areaStacked'>
</amchart>
~~~

~~~javascript
/*Em sua controller basta colocar o json que já vem
  no live do AmCharts trocando apenas o dataProvider
  por data*/
 $scope.areaStacked = {
                "type": "serial",
                "categoryField": "category",
                "startDuration": 1,
                "categoryAxis": {
                    "gridPosition": "start"
                },
                "trendLines": [],
                "graphs": [
                    {
                        "balloonText": "[[title]] of [[category]]:[[value]]",
                        "fillAlphas": 0.7,
                        "id": "AmGraph-1",
                        "lineAlpha": 0,
                        "title": "graph 1",
                        "valueField": "column-1"
                    },
                    {
                        "balloonText": "[[title]] of [[category]]:[[value]]",
                        "fillAlphas": 0.7,
                        "id": "AmGraph-2",
                        "lineAlpha": 0,
                        "title": "graph 2",
                        "valueField": "column-2"
                    }
                ],
                "guides": [],
                "valueAxes": [
                    {
                        "id": "ValueAxis-1",
                        "stackType": "regular",
                        "title": "Axis title"
                    }
                ],
                "allLabels": [],
                "balloon": {},
                "legend": {},
                "titles": [
                    {
                        "id": "Title-1",
                        "size": 15,
                        "text": "Chart Title"
                    }
                ],
                "data": [
                    {
                        "category": "category 1",
                        "column-1": 8,
                        "column-2": 5
                    },
                    {
                        "category": "category 2",
                        "column-1": 6,
                        "column-2": 7
                    },
                    {
                        "category": "category 3",
                        "column-1": 2,
                        "column-2": 3
                    },
                    {
                        "category": "category 4",
                        "column-1": 1,
                        "column-2": 3
                    },
                    {
                        "category": "category 5",
                        "column-1": 2,
                        "column-2": 1
                    },
                    {
                        "category": "category 6",
                        "column-1": 3,
                        "column-2": 2
                    },
                    {
                        "category": "category 7",
                        "column-1": 6,
                        "column-2": 8
                    }
                ]
            };
~~~
