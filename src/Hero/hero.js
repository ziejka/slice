var g = require('../Utils/globals');

function Hero() {
    var x = 0,
        y = 0,
        w = 10,
        h = 10,
        speed = g.HERO_SPEED,
        moving = {
            left: false,
            right: false,
            up: false,
            down: false
        };

    function getPosition() {
        return {x: x, y: y};
    }

    function draw(ctx) {
        move();
        ctx.fillStyle = g.PLAYER_COLOR;
        ctx.fillRect(x, y, w, h);
    }

    function move() {
        for (var key in moving) {
            if (moving[key]) {
                moveInDirection(key);

            }
        }
    }

    function moveUp() {
        y -= speed;
        y = y <= 0 ? 0 : y;
    }

    function moveDown() {
        y += speed;
        y = y >= g.STAGE_HEIGHT ? g.STAGE_HEIGHT : y;
    }

    function moveLeft() {
        x -= speed;
        x = x <= 0 ? 0 : x;
    }

    function moveRight() {
        x += speed;
        x = x >= g.STAGE_WIDTH ? g.STAGE_WIDTH : x;
    }

    function resetPosition() {
        x = 0;
        y = 0;
    }

    function setMove(direction) {
        for (var key in moving) {
            moving[key] = false;
        }
        moving[direction] = true;
    }

    function onKeyDown(evt) {
        evt.preventDefault();
        if(g.KEY_MAP[evt.keyCode]) {
            setMove(g.KEY_MAP[evt.keyCode]);
        }

    }

    function moveInDirection(direction) {
        switch (direction) {
            case g.UP:
                moveUp();
                break;
            case g.DOWN:
                moveDown();
                break;
            case g.LEFT:
                moveLeft();
                break;
            case g.RIGHT:
                moveRight();
                break;
            default:
                break;
        }
    }

    return {
        getPosition: getPosition,
        moveUp: moveUp,
        moveDown: moveDown,
        moveLeft: moveLeft,
        moveRight: moveRight,
        resetPosition: resetPosition,
        draw: draw,
        onKeyDown: onKeyDown
    }
}

module.exports = Hero;