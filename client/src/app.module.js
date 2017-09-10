import angular from 'angular'
import 'angular-ui-router'
import 'ng-storage'
import 'angular-toastr'
import 'angular-animate'
import 'angular-resource'
// import 'bootstrap'
// import jQuery from 'jquery'

import "./js/bower_components/amcharts/dist/amcharts/amcharts.js"
// import "./js/bower_components/amcharts/dist/amcharts/pie.js"
import "./js/bower_components/amcharts/dist/amcharts/serial.js"
import "./js/bower_components/angular-amchart/src/amchart.js"
import "./js/components/amchartDirective/amchart-serial.js"
    



import './app.factory.js'
import './app.services.js'
import './js/wean/wean.module.js'
import './js/wean/wean.controller.js'
import './js/wean/wean.value.js'
import './js/about/about.module.js'
import './js/about/about.controller.js'
import './js/landing/landing.module.js'
import './js/landing/landing.controller.js'
import './js/contraindications/contra.module.js'
import './js/contraindications/contra.controller.js'
import './js/fail/fail.module.js'
import './js/fail/fail.controller.js'
import './js/labs/labs.module.js'
import './js/labs/labs.controller.js'
import './js/cbc/cbc.module.js'
import './js/cbc/cbc.controller.js'
import './js/infection/infection.module.js'
import './js/infection/infection.controller.js'
import './js/xray/xray.module.js'
import './js/xray/xray.controller.js'
import './js/secretion/secretion.module.js'
import './js/secretion/secretion.controller.js'
import './js/lungs/lungs.module.js'
import './js/lungs/lungs.controller.js'
import './js/cardiac/cardiac.module.js'
import './js/cardiac/cardiac.controller.js'
import './js/neuro/neuro.module.js'
import './js/neuro/neuro.controller.js'
import './js/neuromuscular/neuromuscular.module.js'
import './js/neuromuscular/neuromuscular.controller.js'
import './js/result/result.module.js'
import './js/result/result.controller.js'



(function () {
    'use strict';

    angular.module('app', [
        'app.wean', 
        'app.about', 
        'app.landing', 
        'app.contra', 
        'app.fail', 
        'app.labs', 
        'app.cbc', 
        'app.infection', 
        'app.xray', 
        'app.secretion', 
        'app.lungs', 
        'app.cardiac', 
        'app.neuro',
        'app.neuromuscular', 
        'app.result',
        'app.services',
        'app.factory',
        'app.amchartDirective.serial',
        'AngularAmChart', 
        'ui.router', 
        'ngStorage',
        'toastr',
        'ngAnimate',
        'ngResource'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('', '/wean/landing');
        $urlRouterProvider.rule(function ($injector, $location) {
            //what this function returns will be set as the $location.url
            var path = $location.path(),
                normalized = path.toLowerCase();
            if (path != normalized) {
                //instead of returning a new url string, I'll just change the $location.path directly,
                //so I don't have to worry about constructing a new url string and so a new state change is not triggered
                $location.replace().path(normalized);
            }
            // because we've returned nothing, no state change occurs
        });

        $stateProvider
        // PARENT STATE: wean state
        .state('wean', {
            url: '/wean',
            templateUrl: 'views/wean.html',
            controller: 'Wean',
            controllerAs: 'vm'
        })
        // NESTED STATES: child states of 'wean' state
        .state('wean.about', {
            url: '/about',
            templateUrl: 'views/about.html',
            controller: 'About',
            controllerAs: 'vm'
        }).state('wean.landing', {
            url: '/landing',
            templateUrl: 'views/landing.html',
            controller: 'Landing',
            controllerAs: 'vm'
        }).state('wean.contra', {
            url: '/contra',
            templateUrl: 'views/contra.html',
            controller: 'Contra',
            controllerAs: 'vm'
        }).state('wean.fail', {
            url: '/fail',
            templateUrl: 'views/fail.html',
            controller: 'Fail',
            controllerAs: 'vm'
        }).state('wean.labs', {
            url: '/labs',
            templateUrl: 'views/labs.html',
            controller: 'Labs',
            controllerAs: 'vm'
        }).state('wean.cbc', {
            url: '/cbc',
            templateUrl: 'views/cbc.html',
            controller: 'Cbc',
            controllerAs: 'vm'
        }).state('wean.infection', {
            url: '/infection',
            templateUrl: 'views/infection.html',
            controller: 'Infection',
            controllerAs: 'vm'
        }).state('wean.xray', {
            url: '/xray',
            templateUrl: 'views/xray.html',
            controller: 'Xray',
            controllerAs: 'vm'
        }).state('wean.secretion', {
            url: '/secretion',
            templateUrl: 'views/secretion.html',
            controller: 'Secretion',
            controllerAs: 'vm'
        }).state('wean.lungs', {
            url: '/lungs',
            templateUrl: 'views/lungs.html',
            controller: 'Lungs',
            controllerAs: 'vm'
        }).state('wean.cardiac', {
            url: '/cardiac',
            templateUrl: 'views/cardiac.html',
            controller: 'Cardiac',
            controllerAs: 'vm'
        }).state('wean.neuro', {
            url: '/neuro',
            templateUrl: 'views/neuro.html',
            controller: 'Neuro',
            controllerAs: 'vm'
        }).state('wean.neuromuscular', {
            url: '/neuromuscular',
            templateUrl: 'views/neuromuscular.html',
            controller: 'Neuromuscular',
            controllerAs: 'vm'
        }).state('wean.result', {
            url: '/result',
            templateUrl: 'views/result.html',
            controller: 'Result',
            controllerAs: 'vm'
        });
        // $urlRouterProvider.otherwise('/wean/landing');
        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get("$state");
            $state.go('/wean/landing');
        });
    }]);
})();
