// player.js

var Hero = function() {
    var x = 0,
        y = 0,
        dy = 10,
        dx = 10,
        pw = 20,
        ph = 20;

    var animationID;
    var moving = {
        isMovingLeft: false,
        isMovingRight: false,
        isMovingUp: false,
        isMovingDown: false
    }

    function drawHero() {
        ctx.fillStyle = PLAYER_COLOR;
        ctx.fillRect(x, y, pw, ph);
    }

    function moveDown() {
        if (y + ph + dy < STAGE_HEIGHT) {
            y += dy;
        } else {
            y = STAGE_HEIGHT - ph;
        }
        animationID = window.requestAnimationFrame(moveDown);
    }

    function moveUP() {
        if (y - dy > 0) {
            y -= dy;
        } else {
            y = 0;
        }
        animationID = window.requestAnimationFrame(moveUP);
    }

    function moveLeft() {
        if (x - dx > 0) {
            x -= dx;
        } else {
            x = 0;
        }
        animationID = window.requestAnimationFrame(moveLeft);
    }

    function moveRight() {
        if (x + pw + dx < STAGE_WIDTH) {
            x += dx;
        } else {
            x = STAGE_WIDTH - pw;
        }
        animationID = window.requestAnimationFrame(moveRight);
    }

    function setMove(direction) {
        for (var key in moving) {
            moving[key] = false;
        }
        moving[direction] = true;
        window.cancelAnimationFrame(animationID);
    }

    function doKeyDown(evt) {
        switch (evt.keyCode) {
            case 38:
                /* Up arrow was pressed */
                evt.preventDefault();
                if (!moving.isMovingUp) {
                    setMove('isMovingUp');                    
                    moveUP();
                };
                break;
            case 40:
                /* Down arrow was pressed */
                evt.preventDefault();
                if (!moving.isMovingDown) {
                    setMove('isMovingDown');
                    moveDown();
                };
                break;
            case 37:
                /* Left arrow was pressed */
                evt.preventDefault();
                if (!moving.isMovingLeft) {
                    setMove('isMovingLeft');
                    moveLeft();
                };
                break;
            case 39:
                /* Right arrow was pressed */
                evt.preventDefault();
                if (!moving.isMovingRight) {
                    setMove('isMovingRight');
                    moveRight();
                };                
                break;
        }
    }

    return {
        drawHero: drawHero,
        doKeyDown: doKeyDown
    }
}
