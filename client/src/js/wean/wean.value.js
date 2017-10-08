(function () {
    'use strict';

    angular.module('app.wean').value('FormDataModel', FormDataModel);

    function FormDataModel() {

        this.timeBegin
        this.lab_values
        this.labs
        this.cbc
        this.infection
        this.xray
        this.secretion
        this.lungs
        this.cardiac
        this.neuro
        this.neuromuscular
        this.timeEnd
        this.enum = undefined
        this.dynamicCompliance = 0
        this.staticCompliance = 0
        this.labsValue = 0
        this.cbcValue = 0
        this.infectionValue = 0
        this.xrayValue = 0
        this.secretionValue = 0
        this.lungsValue = 0
        this.cardiacValue = 0
        this.neuroValue = 0
        this.neuromuscularValue = 0
        this.totalValue = 0
    }



})();