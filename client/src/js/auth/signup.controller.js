(function() {
  "use strict";

  angular.module("app.signup").controller("Signup", Signup);

  Signup.$inject = ["$scope", "$state", "AuthService"];
  function Signup($scope, $state, AuthService) {
    var vm = this;
    vm.$scope = $scope;
    vm.$state = $state;
    vm.auth = AuthService;
    console.log(vm.auth);

    vm.errorMessage = "";
    vm.signupHeader = "'Signup'";
    vm.submit = _submit;
    activate();

    ////////////////

    function activate() {
      console.log(`sub-state ${vm.signupHeader} loaded!`);
    }

    function _submit() {
      let userPool = vm.auth.getUserPool();

      let nameParam = {
        Name: "name",
        Value: $("#name").val()
      };

      let emailParam = {
        Name: "email",
        Value: $("#email").val()
      };

      let attributes = vm.auth.getUserAttributes(nameParam, emailParam);

      userPool.signUp(
        $("#email").val(),
        $("#password").val(),
        attributes,
        null,
        function(err, result) {
          if (err) {
            console.log(err);

            /**
             * TODO: It is better not to display raw error information, but it is displayed on the screen for function confirmation.
             * */
            vm.errorMessage = err.message;
            $scope.$apply();
            return;
          } else {
            console.log(result);

            vm.$state.go("wean.activate");
            $scope.$apply();
          }
        }
      );

      return false;
    }
  }
})();
