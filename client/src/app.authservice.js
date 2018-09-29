(function() {
  "use strict";

  angular.module("app.authservice", []).service("AuthService", AuthService);

  AuthService.$inject = ["$state", "$timeout"];

  function AuthService($state, $timeout) {
    var vm = this;
    vm.firstActivated = false;
    vm.$state = $state;
    vm.$timeout = $timeout;

    AWS.config.region = "us-east-2";
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "us-east-2:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
    });

    // Cognito User Pool Id
    AWSCognito.config.region = "us-east-2";
    AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "us-east-2:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
    });

    vm.getUserPool = () => {
      let poolData = {
        UserPoolId: "us-east-1_S6PamBeYe",
        ClientId: "XXXXXXXXXXXXXXXXXXXXXXXXXX"
      };
      let userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(
        poolData
      );
      return userPool;
    };

    vm.getUser = (userPool, username) => {
      vm.firstActivated = true;
      let userData = {
        Username: username,
        Pool: userPool
      };
      let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(
        userData
      );
      return cognitoUser;
    };

    vm.getAuthenticationDetails = (username, password) => {
      let authenticationData = {
        Username: username,
        Password: password
      };
      let authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(
        authenticationData
      );
      return authenticationDetails;
    };

    vm.getUserAttributes = function() {
      let attributes = [];
      for (let i = 0; i < arguments.length; i++) {
        let attr = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(
          arguments[i]
        );
        attributes.push(attr);
      }
      return attributes;
    };

    vm.logout = (userPool, username) => {
      // console.log("Service logout go!!!!!!!! ", userPool, username);
      vm.firstActivated = false;
      let userData = {
        Username: username,
        Pool: userPool
      };
      let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(
        userData
      ).signOut();
      // let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(
      //   userData
      // ).globalSignOut();
      return cognitoUser;
    };
  }
})();
