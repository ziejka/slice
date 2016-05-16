// enemy.js 
'use strict';

var Ennemy = function() {
    this.speedX = actions.generateRandom(3);
    this.speedY = actions.generateRandom(3);
    this.x;
    this.y;
    this.r = 10;
}

var actions = function() {
    function drawBall(ennemy, x, y) {
        ennemy.x = x;
        ennemy.y = y;
        ctx.fillStyle = BALL_COLOR;
        ctx.beginPath();
        ctx.arc(ennemy.x, ennemy.y, ennemy.r, 0, 2 * Math.PI, false);
        ctx.fill();
    }

    function generateRandom(maxV) {
        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        return (Math.random() * maxV + 3) * plusOrMinus;
    }

    function bouncing(ennemy) {
        if (ennemy.x < 0 || ennemy.x > stage.width) { ennemy.speedX = ennemy.speedX * -1 };
        if (ennemy.y < 0 || ennemy.y > stage.height) { ennemy.speedY = ennemy.speedY * -1 };

        ennemy.x += ennemy.speedX;
        ennemy.y += ennemy.speedY;
        drawBall(ennemy, ennemy.x, ennemy.y);
    }

    function isInCollision(ennemy, hero) {
        var distX = Math.abs(ennemy.x - hero.x - hero.w / 2);
        var distY = Math.abs(ennemy.y - hero.y - hero.h / 2);

        if (distX > (hero.w / 2 + ennemy.r)) {
            return false; }
        if (distY > (hero.h / 2 + ennemy.r)) {
            return false; }

        if (distX <= (hero.w / 2)) {
            return true; }
        if (distY <= (hero.h / 2)) {
            return true; }

        var dx = distX - hero.w / 2;
        var dy = distY - hero.h / 2;
        return (dx * dx + dy * dy <= (ennemy.r * ennemy.r));
    }

    function checkCollision (ennemy, hero) {
         if (isInCollision(ennemy, hero)) {
            console.log(ennemy.x, hero.x);
         };
    }


    return {
        drawBall: drawBall,
        generateRandom: generateRandom,
        bouncing: bouncing,
        checkCollision: checkCollision
    }
}();


// enemy.js 
// 'use strict';

// var Ennemy = function() {

//     var speedX = generateRandom(3),
//         speedY = generateRandom(3);
//     var ennemy.x, ennemy.y;

//     function drawBall(x, y) {
//         ennemy.x = x;
//         ennemy.y = y;
//         ctx.fillStyle = BALL_COLOR;
//         ctx.beginPath();
//         ctx.arc(ennemy.x, ennemy.y, 10, 0, 2 * Math.PI, false);
//         ctx.fill();
//     }

//     function generateRandom(maxV) {
//         var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
//         return (Math.random() * maxV + 3) * plusOrMinus;
//     }

//     function bouncing() {
//         if (ennemy.x < 0 || ennemy.x > stage.width) { speedX = speedX * -1 };
//         if (ennemy.y < 0 || ennemy.y > stage.height) { speedY = speedY * -1 };

//         ennemy.x += speedX;
//         ennemy.y += speedY;
//         drawBall(ennemy.x, ennemy.y);
//     }

//     return {
//         drawBall: drawBall,
//         bouncing: bouncing
//     }
// }
