var g = require('../Utils/globals');
var subject = require('../Utils/subject');
var Stage = require('../Stage/stage');
var utils = require('../Utils/utils');

function Hero() {
    var x = 5,
        y = 5,
        width = 10,
        height = 10,
        speed = g.HERO_SPEED,
        isOnSegmentLine = false,
        moving = {
            left: false,
            right: false,
            up: false,
            down: false
        };

    this.handlers = [];

    this.getPosition = function () {
        return {x: x + width / 2, y: y + height / 2};
    };

    this.onFrame = function (ctx) {
        move.call(this);
        draw(ctx);
    };

    this.moveUp = function () {
        y -= speed;
    };

    this.moveDown = function () {
        y += speed;
    };

    this.moveLeft = function () {
        x -= speed;
    };

    this.moveRight = function () {
        x += speed;
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

    function draw(ctx) {
        ctx.fillStyle = g.PLAYER_COLOR;
        ctx.fillRect(x, y, width, height);
    }

    function move() {
        var me = this,
            newPosition,
            lastPosition = me.getPosition();

        for (var key in moving) {
            if (moving[key]) {
                moveInDirection.call(me, key);
            }
        }
        newPosition = me.getPosition();

        if (JSON.stringify(newPoint) === JSON.stringify(lastPosition)) {
            return;
        }

        utils.getNewPoint(lastPosition, newPosition, polygon)
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