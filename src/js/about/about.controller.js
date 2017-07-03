(function () {
    'use strict';

    angular.module('app.about').controller('About', About);

    About.$inject = ['$scope'];
    function About($scope) {
        var vm = this;

        vm.aboutHeader = "'about'";
        activate();

        ////////////////

        function activate() {
            console.log('sub-state ' + vm.aboutHeader + ' loaded!');
        }
    }
})();