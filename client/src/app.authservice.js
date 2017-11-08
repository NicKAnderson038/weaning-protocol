(function() {
  "use strict";

  angular.module("app.authservice", []).service("AuthService", AuthService);

  AuthService.$inject = ["$state", "$timeout"];

  function AuthService($state, $timeout) {
    var vm = this;
    vm.$state = $state;
    vm.$timeout = $timeout;

    AWS.config.region = "us-east-2";
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "us-east-2:558c322b-c423-11e7-b674-7b73904ddbe0"
    });

    // Cognito User Pool Id
    AWSCognito.config.region = "us-east-2";
    AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "us-east-2:558c322b-c423-11e7-b674-7b73904ddbe0"
    });

    vm.getUserPool = () => {
      let poolData = {
        UserPoolId: "us-east-1_S6PamBeYe",
        ClientId: "30njf48ug7cgvq8id7bshqnt1u"
      };
      let userPool = new AWSCognito.CognitoIdentityServiceProvider
        .CognitoUserPool(poolData);
      return userPool;
    };

    vm.getUser = (userPool, username) => {
      let userData = {
        Username: username,
        Pool: userPool
      };
      let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider
        .CognitoUser(userData);
      return cognitoUser;
    };

    vm.getAuthenticationDetails = (username, password) => {
      let authenticationData = {
        Username: username,
        Password: password
      };
      let authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider
        .AuthenticationDetails(authenticationData);
      return authenticationDetails;
    };

    vm.getUserAttributes = function() {
      let attributes = [];
      for (let i = 0; i < arguments.length; i++) {
        let attr = new AWSCognito.CognitoIdentityServiceProvider
          .CognitoUserAttribute(arguments[i]);
        attributes.push(attr);
      }
      return attributes;
    };
  }
})();
