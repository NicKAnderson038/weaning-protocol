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
    }



})();