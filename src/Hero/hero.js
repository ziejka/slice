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
        },
        position = {
            x: Stage.stagePoints[0].x,
            y: Stage.stagePoints[0].y
        };

    function _moveUp() {
        position.y -= speed;
    }

    function _moveDown() {
        position.y += speed;
    }

    function _moveLeft() {
        position.x -= speed;
    }

    function _moveRight() {
        position.x += speed;
    }

    function _draw(ctx) {
        var x = position.x - width / 2,
            y = position.y - height / 2;
        ctx.fillStyle = g.PLAYER_COLOR;
        ctx.fillRect(x, y, width, height);
        ctx.fillStyle = g.POINT_COLOR;
        ctx.fillRect(position.x, position.y, 1, 1);
    }

    function _move() {
        var positionData,
            moveKey,
            lastPosition = Object.assign({}, position);

        for (var key in moving) {
            if (moving[key]) {
                _moveInDirection(key);
                moveKey = key;
                break;
            }
        }
        if (!moveKey) return;

        if (!utils.isInside(position, Stage.stagePoints)) {
            moving[moveKey] = false;
            _updatePosition(lastPosition);
            return;
        }

        positionData = utils.getNewPoint(position, lastPosition, Stage.stagePoints, speed);
        if (positionData.blockMove) {
            moving[moveKey] = false;
        }
        _updatePosition(positionData.position);
    }

    function _updatePosition(newPosition) {
        position.x = newPosition.x;
        position.y = newPosition.y;
    }

    function _setMove(direction) {
        for (var key in moving) {
            moving[key] = false;
        }
        moving[direction] = true;
    }

    function _moveInDirection(direction) {
        switch (direction) {
            case g.UP:
                _moveUp();
                break;
            case g.DOWN:
                _moveDown();
                break;
            case g.LEFT:
                _moveLeft();
                break;
            case g.RIGHT:
                _moveRight();
                break;
            default:
                break;
        }
    }

    return {
        handlers: [],

        getPosition: function () {
            return {x: position.x, y: position.y};
        },

        onFrame: function (ctx) {
            _move();
            _draw(ctx);
        },

        resetPosition: function () {
            position.x = 0;
            position.y = 0;
        },

        onKeyDown: function (evt) {
            // this.fire(position);
            if (g.KEY_MAP[evt.keyCode]) {
                evt.preventDefault();
                _setMove(g.KEY_MAP[evt.keyCode]);
            }
        },

        /* test-code */
        __test: {
            _moveUp: _moveUp,
            _moveDown: _moveDown,
            _moveLeft: _moveLeft,
            _moveRight: _moveRight,
            _draw: _draw,
            _move: _move,
            _updatePosition: _updatePosition,
            _setMove: _setMove,
            _moveInDirection: _moveInDirection
        }
        /* end-test-code */
    }
}

Hero.prototype = subject;
module.exports = Hero;