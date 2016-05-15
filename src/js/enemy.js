// enemy.js 
'use strict';

var Ennemy = function() {

    var speed_x = generateRandom(3),
        speed_y = generateRandom(3);
    var enemy_x, enemy_y;

    function draw_ball(x, y) {
        enemy_x = x;
        enemy_y = y;
        ctx.fillStyle = BALL_COLOR;
        ctx.beginPath();
        ctx.arc(enemy_x, enemy_y, 10, 0, 2 * Math.PI, false);
        ctx.fill();
    }

    function generateRandom(maxV) {
        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        return (Math.random() * maxV + 3) * plusOrMinus;
    }

    function bouncing() {
        if (enemy_x < 0 || enemy_x > stage.width) { speed_x = speed_x * -1 };
        if (enemy_y < 0 || enemy_y > stage.height) { speed_y = speed_y * -1 };

        enemy_x += speed_x;
        enemy_y += speed_y;
        draw_ball(enemy_x, enemy_y);
    }

    return {
        draw_ball: draw_ball,
        bouncing: bouncing
    }
}
