(function() {
  "use strict";

  angular.module("app.landing").controller("Landing", Landing);

  Landing.$inject = [
    "$scope",
    "$state",
    "$sessionStorage",
    "FormDataModel",
    "factoryService",
    "AuthService"
  ];

  function Landing(
    $scope,
    $state,
    $sessionStorage,
    FormDataModel,
    factoryService,
    AuthService
  ) {
    var vm = this;

    vm.$scope = $scope;
    vm.$state = $state;
    vm.$sessionStorage = $sessionStorage;
    vm.auth = AuthService;

    vm.selected = _selected;

    vm.landingHeader = "The Weaning Protocol";

    activate();

    ////////////////

    function activate() {
      if (vm.$sessionStorage.formData.enum > 0) {
        $sessionStorage.formData = new FormDataModel();
      }
      console.log($sessionStorage.formData);

      let userPool = vm.auth.getUserPool();
      let currentUser = userPool.getCurrentUser();
      console.log("Auth Result");
      if (currentUser === null) {
        vm.$state.go("wean.login");
      } else {
        console.log(currentUser);
        console.log(currentUser.username);
      }
    }

    function _selected() {
      if ($state.$current.includes["wean.landing"] === true) {
        console.log("Time stamp - Begin");
        var t1 = new Date();
        var datestring =
          ("0" + (t1.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + t1.getDate()).slice(-2) +
          "-" +
          t1.getFullYear() +
          " " +
          ("0" + t1.getHours()).slice(-2) +
          ":" +
          ("0" + t1.getMinutes()).slice(-2);
        //vm.$sessionStorage.timeBegin = datestring;
        //factoryService.timeBegin(vm.$sessionStorage.timeBegin)

        vm.$sessionStorage.formData.enum = [0];
        vm.$sessionStorage.formData.timeBegin = datestring;
        vm.$state.go("wean.contra");

        // console.log(FormDataModel.timeBegin)
        // this.formData = FormDataModel;
        // this.formData.timeBegin = vm.$sessionStorage.timeBegin
        // FormDataModel.timeBegin = this.formData.timeBegin
        // console.log(FormDataModel.timeBegin);
        // FormDataModel = function () {
        //     this.formData.timeBegin = vm.$sessionStorage.timeBegin
        //     console.log(this.formData.timeBegin)
        //     return this.formData.timeBegin
        // }
      } else if ($state.$current.includes["wean.infection"] === true) {
        console.log("Infection: Source");
        console.log(vm.valueInfection);
        vm.$sessionStorage.valueInfection = vm.valueInfection;
      } else if ($state.$current.includes["wean.result"] === true) {
        console.log("result");
        //console.log(vm.$sessionStorage.valueInfection);
      } else {
        return;
      }
    }
  }
})();
