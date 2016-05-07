var setup = (function(G) {
    'use strict';

    var obj = {};

    obj.stage = document.getElementById('main-canvas');
    obj.ctx = obj.stage.getContext("2d");

    function set_stage (argument) {
    	obj.stage.height = G.HEIGHT;
    }

    return obj;

})(GLOBALS);
