(function() {
  "use strict";

  angular.module("app.login").controller("Login", Login);

  Login.$inject = ["$scope", "$state", "AuthService"];
  function Login($scope, $state, AuthService) {
    var vm = this;
    vm.$scope = $scope;
    vm.$state = $state;
    vm.auth = AuthService;
    console.log(vm.auth);

    vm.errorMessage = "";
    vm.loginHeader = "'login'";
    vm.submit = _submit;

    activate();

    ////////////////

    function activate() {
      console.log(
        `sub-state ${vm.loginHeader} loaded! and auth firstActive is ${
          vm.auth.firstActivated
        }`
      );
      if (vm.auth.firstActivated) {
        let userPool = vm.auth.getUserPool();
        let currentUser = userPool.getCurrentUser();
        console.log("Current user is NOT null, logout action");
        vm.auth.logout(currentUser.pool, currentUser.username);
      }
    }

    function _submit() {
      let userPool = vm.auth.getUserPool();

      let cognitoUser = vm.auth.getUser(userPool, $("#email").val());
      let authenticationDetails = vm.auth.getAuthenticationDetails(
        $("#email").val(),
        $("#password").val()
      );

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
          let accessToken = result.getAccessToken().getJwtToken();
          $scope.accessToken = accessToken;

          let currentUser = userPool.getCurrentUser();

          vm.$state.go("wean.landing");
          $scope.$apply();
        },
        onFailure: function(err) {
          vm.errorMessage = "E-mail address or password is wrong.";
          $scope.$apply();
        }
      });
    }

    return false;
  }
})();
