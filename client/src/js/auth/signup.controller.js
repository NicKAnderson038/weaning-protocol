(function() {
  "use strict";

  angular.module("app.signup").controller("Signup", Signup);

  Signup.$inject = ["$scope", "authService"];
  function Signup($scope, authService) {
    var vm = this;
    vm.auth = authService;
    console.log(vm.auth);

    vm.signupHeader = "'Signup'";
    activate();

    ////////////////

    function activate() {
      console.log(`sub-state ${vm.signupHeader} loaded!`);
    }
  }
})();
