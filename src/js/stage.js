//stage.js

var bg = function(argument) {
    function draw_bg() {
        ctx.fillStyle = STAGE_BG;
        ctx.fillRect(0, 0, stage.width, stage.height);
    }

    return {
    	draw_bg: draw_bg
    }

}();
