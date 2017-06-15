var g = require('../Utils/globals');
var subject = require('../Utils/subject');
var utils = require('../Utils/utils');

function Hero(Stage) {

    var width = 10,
        height = 10,
        speed = 5,
        moving = {
            left: false,
            right: false,
            up: false,
            down: false
        },
        heroPath = [],
        position = {
            x: Stage.stagePoints[0].x,
            y: Stage.stagePoints[0].y
        };

    /* Hero API */
    this.handlers = [];

    this.getPosition = function () {
        return {x: position.x, y: position.y};
    };

    this.onFrame = function (ctx) {
        _move();
        _draw(ctx);
    };

    this.resetPosition = function () {
        position.x = Stage.stagePoints[0].x;
        position.y = Stage.stagePoints[0].y;
    };

    this.onKeyDown = function (evt) {
        if (g.KEY_MAP[evt.keyCode]) {
            evt.preventDefault();
            _setMove(g.KEY_MAP[evt.keyCode]);
            _addPathPoint(position);
        }
    };
    /* End Hero API */

    /* test-code */
    this.__test = {
        _getMoving: moving,
        _getHeroPath: _getHeroPath,
        _getPosition: position,

        _moveUp: _moveUp,
        _moveDown: _moveDown,
        _moveLeft: _moveLeft,
        _moveRight: _moveRight,

        _draw: _draw,
        _move: _move,
        _updatePosition: _updatePosition,
        _setMove: _setMove,
        _moveInDirection: _moveInDirection,
        _onHitWall: _onHitWall,
        _addPathPoint: _addPathPoint,
        _resetPathPoints: _resetPathPoints

    };
    /* end-test-code */

    function _getHeroPath() {
        return heroPath
    }

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
            _onHitWall();
        }
        _updatePosition(positionData.position);
    }

    function _addPathPoint(newPoint) {
        var vertical, i,
            shouldRemoveSecond = false,
            lastIndex = heroPath.length - 1,
            lastPoint = heroPath[lastIndex],
            secondToLastPoint = heroPath[lastIndex - 1];

        if (lastPoint && secondToLastPoint) {
            vertical = lastPoint.x === secondToLastPoint.x;

            if (vertical && newPoint.x === secondToLastPoint.x) {
                shouldRemoveSecond = true;
            } else if (newPoint.y === secondToLastPoint.y) {
                shouldRemoveSecond = true;
            }
        }

        if (shouldRemoveSecond) {
            heroPath.splice(lastIndex - 2, 1);
        }
        heroPath.push(newPoint);
    }

    function _onHitWall() {
        if (!heroPath) {
            return;
        }
        heroPath.push(position);
        Stage.addNewPath(heroPath);
        _resetPathPoints();
    }

    function _resetPathPoints() {
        heroPath = [];
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
}

Hero.prototype = subject;
module.exports = Hero;