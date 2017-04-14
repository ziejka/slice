var g = require('../Utils/globals');
var subject = require('../Utils/subject');
var Stage = require('../Stage/stage');
var utils = require('../Utils/utils');

function Hero() {

    var width = 10,
        height = 10,
        speed = 5,
        hit = false,
        moving = {
            left: false,
            right: false,
            up: false,
            down: false
        };

    this.position = {
        x: 0,
        y: 0
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
        var me = this,
            x = me.position.x - width / 2,
            y = me.position.y - height / 2;
        ctx.fillStyle = g.PLAYER_COLOR;
        ctx.fillRect(x, y, width, height);
        ctx.fillStyle = g.POINT_COLOR;
        ctx.fillRect(me.position.x, me.position.y, 1, 1);
    }

    function move() {
        var me = this,
            positionData,
            moveKey,
            newPosition,
            lastPosition = Object.assign({}, me.position);

        for (var key in moving) {
            if (moving[key]) {
                moveInDirection.call(me, key);
                moveKey = key;
            }
        }
        newPosition = me.getPosition();

        if (JSON.stringify(newPosition) === JSON.stringify(lastPosition)) {
            return;
        }

        positionData = utils.getNewPoint(newPosition, lastPosition, Stage.stagePoints, speed);

        if (positionData.blockMove) {
                moving[moveKey] = false;
        }

        updatePosition.call(me, positionData.position);

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