var g = require('../Utils/globals');
var subject = require('../Utils/subject');
var Stage = require('../Stage/stage');
var utils = require('../Utils/utils');

function Hero() {

    var width = 10,
        height = 10,
        speed = 5,
        moving = {
            left: false,
            right: false,
            up: false,
            down: false
        };

    this.position = {
        x: 5,
        y: 5
    };

    this.handlers = [];

    this.getPosition = function () {
        return this.position;
    };

    this.onFrame = function (ctx) {
        move.call(this);
        draw.call(this, ctx);
    };

    this.moveUp = function () {
        this.position.y -= speed;
    };

    this.moveDown = function () {
        this.position.y += speed;
    };

    this.moveLeft = function () {
        this.position.x -= speed;
    };

    this.moveRight = function () {
        this.position.x += speed;
    };

    this.resetPosition = function () {
        this.position.x = 0;
        this.position.y = 0;
    };

    this.onKeyDown = function (evt) {
        if (g.KEY_MAP[evt.keyCode]) {
            evt.preventDefault();
            setMove(g.KEY_MAP[evt.keyCode]);
        }
    };

    function draw(ctx) {
        var me = this;
        ctx.fillStyle = g.PLAYER_COLOR;
        ctx.fillRect(me.position.x - width / 2, me.position.y - height / 2, width, height);
    }

    function move() {
        var me = this,
            position,
            newPosition,
            lastPosition = Object.assign({}, me.position);

        for (var key in moving) {
            if (moving[key]) {
                moveInDirection.call(me, key);
            }
        }
        newPosition = me.getPosition();

        if (JSON.stringify(newPosition) === JSON.stringify(lastPosition)) {
            return;
        }

        if(utils.isInside(newPosition, lastPosition, Stage.stagePoints)) {
            position = newPosition;
        } else {
            position = lastPosition;
        }
        updatePosition.call(me, position)
    }
    
    function updatePosition(position) {
        var me = this;
        me.position.x = position.x;
        me.position.y = position.y;
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