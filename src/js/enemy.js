// enemy.js 
'use strict';

var Ennemy = function() {
    this.speedX = actions.generateRandomSpeed(3);
    this.speedY = actions.generateRandomSpeed(3);
    this.x;
    this.y;
    this.r = 10;
}

var actions = function() {
    function drawBall(ennemy, x, y) {
        ennemy.x = x;
        ennemy.y = y;
        ctx.fillStyle = BALL_COLOR;
        helpers.drawCircle(ennemy.x, ennemy.y, ennemy.r);
    }

    function generateRandomSpeed(maxV) {
        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        return Math.floor((Math.random() * maxV + 3) * plusOrMinus);
    }

    function bouncing(ennemy) {
        if (ennemy.x < 0 || ennemy.x > stage.width) { ennemy.speedX *= -1 };
        if (ennemy.y < 0 || ennemy.y > stage.height) { ennemy.speedY *= -1 };
        ennemy.x += ennemy.speedX;
        ennemy.y += ennemy.speedY;
        drawBall(ennemy, ennemy.x, ennemy.y);
    }
    
    return {
        drawBall: drawBall,
        generateRandomSpeed: generateRandomSpeed,
        bouncing: bouncing,
    }
}();