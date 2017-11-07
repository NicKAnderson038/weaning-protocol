(function() {
  "use strict";

  angular.module("app.activate").controller("Activate", Activate);

  Activate.$inject = ["$scope", "authService"];
  function Activate($scope, authService) {
    var vm = this;
    vm.auth = authService;
    console.log(vm.auth);

    vm.activateHeader = "'activate'";
    activate();

    ////////////////

    function activate() {
      console.log(`sub-state ${vm.activateHeader} loaded!`);
    }
  }
})();
