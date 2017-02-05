var g = require('../Utils/globals');
var subject = require('../Utils/subject');

function Hero() {
    var x = 0,
        y = 0,
        width = 10,
        height = 10,
        speed = g.HERO_SPEED,
        moving = {
            left: false,
            right: false,
            up: false,
            down: false
        };

    this.handlers = [];

    this.getPosition = function () {
        return {x: x, y: y};
    };

    this.onFrame = function (ctx) {
        move.call(this);
        ctx.fillStyle = g.PLAYER_COLOR;
        ctx.fillRect(x, y, width, height);
    };

    this.moveUp = function () {
        y -= speed;
        y = y <= 0 ? 0 : y;
    };

    this.moveDown = function () {
        y += speed;
        y = y >= g.STAGE_HEIGHT ? g.STAGE_HEIGHT : y;
    };

    this.moveLeft = function () {
        x -= speed;
        x = x <= 0 ? 0 : x;
    };

    this.moveRight = function () {
        x += speed;
        x = x >= g.STAGE_WIDTH ? g.STAGE_WIDTH : x;
    };

    this.resetPosition = function () {
        x = 0;
        y = 0;
    };

    this.onKeyDown = function (evt) {
        if (g.KEY_MAP[evt.keyCode]) {
            evt.preventDefault();
            setMove(g.KEY_MAP[evt.keyCode]);
        }
    };

    function move() {
        for (var key in moving) {
            if (moving[key]) {
                moveInDirection.call(this, key);
            }
        }
    }

    function setMove(direction) {
        for (var key in moving) {
            moving[key] = false;
        }
        moving[direction] = true;
    }

    function moveInDirection(direction) {
        var me = this;
        switch (direction) {
            case g.UP:
                me.moveUp();
                break;
            case g.DOWN:
                me.moveDown();
                break;
            case g.LEFT:
                me.moveLeft();
                break;
            case g.RIGHT:
                me.moveRight();
                break;
            default:
                break;
        }
    }
}

Hero.prototype = subject;

module.exports = Hero;