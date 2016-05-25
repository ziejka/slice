// player.js

var Hero = function() {
    var x = 0,
        y = 0,
        dy = 10,
        dx = 10,
        w = 20,
        h = 20;

    var points = [[x+w/2, y+h/2]];

    var animationID;
    var cursentDriection;    
    var moving = {
        isMovingLeft: false,
        isMovingRight: false,
        isMovingUp: false,
        isMovingDown: false
    }

    function drawHero() {
        drawLine();
        ctx.fillStyle = PLAYER_COLOR;
        ctx.fillRect(x, y, w, h);
        
    }

    function drawLine () {
        ctx.strokeStyle = 'green';
        ctx.beginPath();
        for (var i = 0; i < points.length; i++) {
            var px = points[i][0];
            var py = points[i][1];
            ctx.lineTo(px, py);
        };
        ctx.lineTo(x+w/2, y+h/2);
        ctx.stroke();
    }

    function resetPoints () {
         points = [[x+w/2, y+h/2]];
    }

    function moveDown() {
        cursentDriection = 'down';
        if (y + h + dy < STAGE_HEIGHT) {
            y += dy;
        } else {
            y = STAGE_HEIGHT - h;
        }
        animationID = window.requestAnimationFrame(moveDown);
    }

    function moveUP() {
        cursentDriection = 'up';
        if (y - dy > 0) {
            y -= dy;
        } else {
            y = 0;
        }
        animationID = window.requestAnimationFrame(moveUP);
    }

    function moveLeft() {
        cursentDriection = 'left';
        if (x - dx > 0) {
            x -= dx;
        } else {
            x = 0;
        }
        animationID = window.requestAnimationFrame(moveLeft);
    }

    function moveRight() {
        cursentDriection = 'right';
        if (x + w + dx < STAGE_WIDTH) {
            x += dx;
        } else {
            x = STAGE_WIDTH - w;
            wallHit()
        }
        animationID = window.requestAnimationFrame(moveRight);
    }

    function setMove(direction) {
        addPoint(direction);
        for (var key in moving) {
            moving[key] = false;
        }
        moving[direction] = true;
        window.cancelAnimationFrame(animationID);
    }

    function addPoint (direction) {          
        if (canPushPoint(direction)) {
            points.push([x+w/2, y+h/2]);
        };
    }

    function wallHit () {
        addPoint();
        ctx.fill(); 
    }

    function canPushPoint (direction) {
        if (cursentDriection == direction) return false;
        if (cursentDriection == oppositeDirection(direction)) return false;
        return true;

    }

    function oppositeDirection (direction) {
        switch (direction) {
            case 'up': return 'down';
            case 'down': return 'up';
            case 'left': return 'right';
            case 'right': return 'left';
        }

    }
    function doKeyDown(evt) {
        switch (evt.keyCode) {
            case 38:
                /* Up arrow was pressed */
                evt.preventDefault();
                if (!moving.up) {
                    setMove('up');
                    moveUP();
                };
                break;
            case 40:
                /* Down arrow was pressed */
                evt.preventDefault();
                if (!moving.down) {
                    setMove('down');
                    moveDown();
                };
                break;
            case 37:
                /* Left arrow was pressed */
                evt.preventDefault();
                if (!moving.left) {
                    setMove('left');
                    moveLeft();
                };
                break;
            case 39:
                /* Right arrow was pressed */
                evt.preventDefault();
                if (!moving.right) {
                    setMove('right');
                    moveRight();
                };
                break;
        }
    }

    function getHeroCords() {
        return {
            x: x,
            y: y,
            w: w,
            h: h
        }
    }

    return {
        drawHero: drawHero,
        doKeyDown: doKeyDown,
        getHeroCords: getHeroCords,
        resetPoints: resetPoints
    }
}
