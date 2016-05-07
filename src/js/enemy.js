// enemy.js 
'use strict';

var Ennemy = function() {

    var x = Math.random() * STAGE_WIDTH,
        y = Math.random() * STAGE_HEIGHT,
        speed_x = 5,
        speed_y = 5;

    function draw_bg() {
        ctx.fillStyle = STAGE_BG;
        ctx.fillRect(0, 0, stage.width, stage.height);
    }

    function draw_ball(x, y) {
        draw_bg();
        ctx.fillStyle = BALL_COLOR;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
        ctx.fill();
    }

    function bouncing() {

        if (x < 0 || x > stage.width) { speed_x = speed_x * -1 };
        if (y < 0 || y > stage.height) { speed_y = speed_y * -1 };

        x += speed_x;
        y += speed_y;
        draw_ball(x, y);
    }

    function init() {
        setInterval(bouncing, 10);
    }

    init();

    return {
            init: init
        };

}
