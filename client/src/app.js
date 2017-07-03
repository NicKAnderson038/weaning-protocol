// import angular from 'angular'
// import 'angular-ui-router'

// angular.module('weaning', ['ui.router'])

//     .config(($stateProvider, $urlRouterProvider) => {
//         $urlRouterProvider.otherwise('/landing')

//         $stateProvider
//         .state('landing', {
//                 url: '/landing',
//                 templateUrl: 'views/landing.html'
//             })
//             // .state('wean', {
//             //     url: '/wean',
//             //     templateUrl: 'views/wean.html',
//             //     resolve: {
//             //         weaningService: function ($http) {
//             //             return $http.get('/wean')
//             //             //if larger, place into a factory                 
//             //         }
//             //     }
//                 // controller: function (weaningService) {
//                 //     this.weaningHeader = weaningService.data
//                 // },
//                 // controllerAs: 'weanCtrl'
//             // })
//             // .state('wean.landing', {
//             //     url: '/:weanName',
//             //     templateUrl: 'views/wean-landing.html'
//                 // resolve: {
//                 //     weanService: function ($q) {
//                 //         //end point, use promise -$q for temporay placeholder
//                 //         return $q((resolve, reject) => {
//                 //             let obj = {
//                 //                 "name":"contra",
//                 //                 "title": "Click to begin checking to begin the weaning procedure.",
//                 //                 "issues": [{
//                 //                     "medical": "Saturation: FiO2 <= 50%",
//                 //                     "id": 1
//                 //                 }, {
//                 //                     "medical": "Peep: Peep <= 8",
//                 //                     "id": 2
//                 //                 },{
//                 //                     "medical": "Patient on No or Low dosage of Vasopressor",
//                 //                     "id": 3
//                 //                 }]
//                 //             }
//                 //             resolve({data:obj});
//                 //         })
//                 //     }
//                 // },
//                 // controller: function (weanService){
//                 //     this.obj = weanService.data
//                 // },
//                 // controllerAs:'landingCtrl'
            
//             .state('contra', {
//                 url: '/contra',
//                 templateUrl: 'views/contra.html'
//             })
//             .state('labs', {
//                 url: '/labs',
//                 templateUrl: 'views/labs.html'
//             })
//              .state('about', {
//                 url: '/about',
//                 templateUrl: 'views/about.html'
//             })
//     })




// .controller('mainController', function($scope, $http){
//     this.landingHeader = "The Weaning Protocol";
    
//     $http.get('/landing').then((response) => {
//         this.info = response.data;
//     })

//     return $scope.vm = this;
// })
