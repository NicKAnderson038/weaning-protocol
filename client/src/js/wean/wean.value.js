(function () {
    'use strict';

    angular.module('app.wean').value('FormDataModel', FormDataModel);

    function FormDataModel() {

        this.timeBegin
        this.labs
        this.cbc
        this.infection
        this.xray
        this.secretion
        this.lungs
        this.cardiac
        this.neuro
        this.timeEnd
        this.enum = undefined
        this.labsValue = 0
        this.cbcValue = 0
        this.infectionValue = 0
        this.xrayValue = 0
        this.secretionValue = 0
        this.lungsValue = 0
        this.cardiacValue = 0
        this.neuroValue = 0
    }



})();