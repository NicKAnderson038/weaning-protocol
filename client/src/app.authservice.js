(function() {
  "use strict";

  angular.module("app.authservice", []).service("authService", authService);

  authService.$inject = ["$scope ", "$state", "$timeout"];

  function authService($scope, $state, $timeout) {
    var vm = this;
    vm.$scope = $scope;
    vm.$state = $state;
    vm.$timeout = $timeout;

    AWS.config.region = "us-east-2";
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "us-east-2:60c2a0ab-c3ee-11e7-876d-99d41e08ac2e"
    });

    // Cognito User Pool Id
    AWSCognito.config.region = "us-east-2";
    AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "us-east-2:60c2a0ab-c3ee-11e7-876d-99d41e08ac2e"
    });

    function getUserPool() {
      let poolData = {
        UserPoolId: "us-east-1_0CZySXtci",
        ClientId: "3gh9pap7pp23sqt08s9ocvp8id"
      };
      let userPool = new AWSCognito.CognitoIdentityServiceProvider
        .CognitoUserPool(poolData);
      return userPool;
    }

    function getUser(userPool, username) {
      let userData = {
        Username: username,
        Pool: userPool
      };
      let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider
        .CognitoUser(userData);
      return cognitoUser;
    }

    function getAuthenticationDetails(username, password) {
      let authenticationData = {
        Username: username,
        Password: password
      };
      let authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider
        .AuthenticationDetails(authenticationData);
      return authenticationDetails;
    }

    function getUserAttributes() {
      let attributes = [];
      for (let i = 0; i < arguments.length; i++) {
        let attr = new AWSCognito.CognitoIdentityServiceProvider
          .CognitoUserAttribute(arguments[i]);
        attributes.push(attr);
      }
      return attributes;
    }
  }
})();
