(function() {
  "use strict";

  angular.module("app.login").controller("Login", Login);

  Login.$inject = ["$scope", "authService"];
  function Login($scope, authService) {
    var vm = this;
    vm.auth = authService;
    console.log(vm.auth);

    vm.loginHeader = "'login'";
    activate();

    ////////////////

    function activate() {
      console.log(`sub-state ${vm.loginHeader} loaded!`);
    }
  }
})();
