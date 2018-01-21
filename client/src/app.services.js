(function() {
  "use strict";

  const URL =
    "https://94ecsvy4yg.execute-api.us-east-1.amazonaws.com/dev/services";

  const urlId =
    "https://94ecsvy4yg.execute-api.us-east-1.amazonaws.com/dev/services/{id}";

  const getRequest = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };

  angular.module("app.services", []).factory("WeanService", [
    "$http",
    "$q",
    "$resource",
    function($http, $q, $resource) {
      return {
        getAll: async () => {
          try {
            const response = await fetch(URL, getRequest);
            const data = await response.json();
            return data;
          } catch (err) {
            throw new Error(err);
          }
        },
        post: async data => {
          const body = {
            clinicianName: data.clinicianName,
            clinicianTitle: data.clinicianTitle,
            patientList: data.patientList
          };
          try {
            const response = await fetch(URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(body)
            });
            const data = await response.json();
            return data;
          } catch (err) {
            throw new Error(err);
          }
        },
        array: $resource(
          "data/ptdataArray.json",
          {},
          {
            query: {
              method: "GET",
              params: {},
              isArray: true
            }
          }
        ),
        obj: $resource(
          "data/ptdata.json",
          {},
          {
            query: {
              method: "GET",
              params: {},
              isArray: false
            }
          }
        )
      };
    }
  ]);
})();
