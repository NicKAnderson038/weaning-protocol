(function() {
  "use strict";

  angular.module("app.directive", []).directive("navbar", navbar);

  function navbar() {
    return {
      templateUrl: "views/landing.html",
      controller: "Landing",
      controllerAs: "vm"
    };
  }

  Landing.$inject = ["authService"];

  function Landing(authService) {
    var vm = this;
    vm.auth = authService;
  }
})();
