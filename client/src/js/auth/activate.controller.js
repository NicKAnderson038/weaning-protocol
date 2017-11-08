(function() {
  "use strict";

  angular.module("app.activate").controller("Activate", Activate);

  Activate.$inject = ["$scope", "$state", "AuthService"];
  function Activate($scope, $state, AuthService) {
    var vm = this;
    vm.$scope = $scope;
    vm.$state = $state;

    vm.auth = AuthService;
    vm.errorMessage = "";
    vm.activateHeader = "'activate'";
    vm.submit = _submit;
    activate();

    ////////////////

    function activate() {
      console.log(`sub-state ${vm.activateHeader} loaded!`);
    }

    function _submit() {
      let userPool = vm.auth.getUserPool();

      let cognitoUser = vm.auth.getUser(userPool, $("#email").val());
      let activationKey = $("#activationCode").val();

      cognitoUser.confirmRegistration(activationKey, true, function(
        err,
        result
      ) {
        if (err) {
          console.log(err);

          // TODO: It is better not to display raw error information, but it is displayed on the screen for function confirmation.
          vm.errorMessage = err.message;
          $scope.$apply();
          return;
        }

        vm.$state.go("wean.login");
        $scope.$apply();
      });
    }

    return false;
  }
})();
