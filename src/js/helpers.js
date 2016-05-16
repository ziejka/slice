var helpers = function() {
    var counter = 0;

    function drawCircle(x, y, r) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI, false);
        ctx.fill();
    }

    function generateRandom(max) {
        return Math.floor(Math.random() * max);
    }

    function isInCollision(cirlce, hero) {
        var distX = Math.abs(cirlce.x - (hero.x + hero.w / 2));
        var distY = Math.abs(cirlce.y - (hero.y + hero.h / 2));

        if (distX > (hero.w / 2 + cirlce.r)) {
            return false;
        }
        if (distY > (hero.h / 2 + cirlce.r)) {
            return false;
        }

        if (distX <= (hero.w / 2)) {
            return true;
        }
        if (distY <= (hero.h / 2)) {
            return true;
        }

        var dx = distX - hero.w / 2;
        var dy = distY - hero.h / 2;
        return (dx * dx + dy * dy <= (cirlce.r * cirlce.r));
    }

    function checkCollision(cirlce, hero, callback) {
        if (isInCollision(cirlce, hero)) {
            callback(cirlce);
        };
    }

    function ennemyHit(ennemy) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
        ctx.fillRect(0, 0, stage.width, stage.height);
        if (counter != 0) {
            document.getElementById('last-score').innerHTML = counter.toString();
            counter = 0;
            document.getElementById('score').innerHTML = counter.toString();
        }
    }


    function bonusHit(bonus) {
        counter += 1;
        document.getElementById('score').innerHTML = counter.toString();
        bonus.restart();
    }

    return {
        drawCircle: drawCircle,
        generateRandom: generateRandom,
        isInCollision: isInCollision,
        checkCollision: checkCollision,
        ennemyHit: ennemyHit,
        bonusHit: bonusHit
    }
}();
