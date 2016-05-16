// setup.js
'use strict';

var stage = document.getElementById('main-canvas');
var ctx = stage.getContext("2d");

var canvas = function() {

    function setStage() {
        stage.height = STAGE_HEIGHT;
        stage.width = STAGE_WIDTH;
    }

    return {
        setStage: setStage
    }

}();
