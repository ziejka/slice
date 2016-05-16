//stage.js

var bg = function(argument) {
    function drawBg() {
        ctx.fillStyle = STAGE_BG;
        ctx.fillRect(0, 0, stage.width, stage.height);
    }

    return {
    	drawBg: drawBg
    }

}();
