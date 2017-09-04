(function () {
    'use strict';

    angular.module('app.fail').controller('Fail', Fail);

    Fail.$inject = ['$scope'];
    function Fail($scope) {
        var vm = this;

        vm.failHeader = 'Wean Contraindaticated';

        activate();

        ////////////////

        function activate() {
            console.log(`${vm.failHeader}`);
        }
    }
})();