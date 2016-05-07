// setup.js
'use strict';

var stage = document.getElementById('main-canvas');
var ctx = stage.getContext("2d");

var Canvas = function() {

    function set_stage() {
        stage.height = STAGE_HEIGHT;
        stage.width = STAGE_WIDTH;
    }

    function init() {
        set_stage();
    }

    init();
};

Canvas(); 