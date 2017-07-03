(function () {
    'use strict';

    angular.module('app.contra').controller('Contra', Contra);

    Contra.$inject = ['$scope'];
    function Contra($scope) {
        var vm = this;

        vm.contraindicationsHeader = 'Screening for Weaning';

        vm.contraindications = [{ "id": 1, "selected": false, "label": "PaO2/fiO2 ration < 150?" }, { "id": 2, "selected": false, "label": "fiO2 > 50% and Peep >= 8?" }, { "id": 3, "selected": false, "label": "Patient scheduled for surgery" }, { "id": 4, "selected": false, "label": "Patient on a High dosage of Vasopressor?" }, { "id": 5, "selected": false, "label": "Patient Unconscious and Unresponsive?" }];

        activate();

        ////////////////

        function activate() {
            console.log('sub-state ' + vm.contraindicationsHeader + ' loaded!');
        }
    }
})();