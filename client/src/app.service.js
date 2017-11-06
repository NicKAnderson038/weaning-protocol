(function() {
  "use strict";

  angular.module("app.service", []).service("authService", authService);

  authService.$inject = ["$state", "angularAuth0", "$timeout"];

  function authService($state, angularAuth0, $timeout) {
    function login() {
      angularAuth0.authorize();
    }

    // return {
    //   login: login
    // };

    function handleAuthentication() {
      angularAuth0.parseHash(function(err, authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
          setSession(authResult);
          $state.go("/wean/landing");
        } else if (err) {
          $timeout(function() {
            $state.go("/wean/landing");
          });
          console.log(err);
        }
      });
    }

    function setSession(authResult) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
      );
      localStorage.setItem("access_token", authResult.accessToken);
      localStorage.setItem("id_token", authResult.idToken);
      localStorage.setItem("expires_at", expiresAt);
    }

    function logout() {
      // Remove tokens and expiry time from localStorage
      localStorage.removeItem("access_token");
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
    }

    function isAuthenticated() {
      // Check whether the current time is past the
      // access token's expiry time
      let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
      return new Date().getTime() < expiresAt;
    }

    return {
      login: login,
      // ...
      handleAuthentication: handleAuthentication,
      logout: logout,
      isAuthenticated: isAuthenticated
    };
  }
})();
