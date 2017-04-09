(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var g = require('../Utils/globals');
var subject = require('../Utils/subject');
var Stage = require('../Stage/stage');
var utils = require('../Utils/utils');

function Hero() {

    var width = 10,
        height = 10,
        speed = g.HERO_SPEED,
        isOnSegmentLine = false,
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
        console.log(this.getPosition());
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
        ctx.fillRect(me.position.x, me.position.y, width, height);
    }

    function move() {
        var me = this,
            position,
            newPosition,
            lastPosition = Object.assign({}, me.position);

        for (var key in moving) {
            if (moving[key]) {
                moveInDirection.call(me, key);
                console.log(me.getPosition());
            }
        }
        newPosition = me.getPosition();

        if (JSON.stringify(newPosition) === JSON.stringify(lastPosition)) {
            return;
        }

        if(!utils.isInside(newPosition, Stage.stagePoints)) {
            newPosition = lastPosition;
            updatePosition.call(me, newPosition)
        }
        // position = utils.getNewPoint(lastPosition, newPosition, Stage.stagePoints);
        // updatePosition.call(me, position)
    }
    
    function updatePosition(position) {
        this.position.x = position.x;
        this.position.y = position.y;
        console.log(this.getPosition());
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
},{"../Stage/stage":2,"../Utils/globals":3,"../Utils/subject":4,"../Utils/utils":5}],2:[function(require,module,exports){
var g = require('../Utils/globals');

var Stage = {
    stagePoints: [
        {x: 0, y: 0},
        {x: g.STAGE_WIDTH, y: 0},
        {x: g.STAGE_WIDTH, y: g.STAGE_HEIGHT},
        {x: 0, y: g.STAGE_HEIGHT}
    ],

    drawBg: function (ctx) {
        ctx.fillStyle = g.STAGE_BG;
        ctx.fillRect(0, 0, g.STAGE_WIDTH, g.STAGE_HEIGHT);
    },

    onFrame: function (ctx) {
        this.drawBg(ctx);
    },

    eventHandler: function () {

    }

};

module.exports = Stage;
},{"../Utils/globals":3}],3:[function(require,module,exports){
module.exports = {
    STAGE_WIDTH: 500,
    STAGE_HEIGHT: 500,
    HERO_SPEED: 5,
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right',
    STAGE_BG: '#484848',
    PLAYER_COLOR: '#cdcdcd',
    KEY_MAP: {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    }
};
},{}],4:[function(require,module,exports){
module.exports = {

    subscribe: function (fn) {
        this.handlers.push(fn);
    },

    unsubscribe: function (fn) {
        this.handlers = this.handlers.filter(
            function (item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    },

    fire: function (o, thisObj) {
        var scope = thisObj || null;
        this.handlers.forEach(function (item) {
            item.call(scope, o);
        });
    }
};
},{}],5:[function(require,module,exports){
function getOnSegmentLine(newPosition, segment) {
    var max, min,
        horizontal = segment[0].x === segment[1].x,
        result = {
            position: {},
            isOnSegmentLine: false
        };

    if (horizontal && newPosition.x === segment[0].x) {
        max = Math.max(segment[0].y, segment[1].y);
        min = Math.min(segment[0].y, segment[1].y);

        if (newPosition.y > max) {
            newPosition.y = max
        } else if (newPosition.y < min) {
            newPosition.y = min
        }
        result.position = newPosition;
        result.isOnSegmentLine = true;

    } else if (newPosition.y === segment[0].y) {
        max = Math.max(segment[0].x, segment[1].x);
        min = Math.min(segment[0].x, segment[1].x);

        if (newPosition.y > max) {
            newPosition.y = max
        } else if (newPosition.y < min) {
            newPosition.y = min;
        }
        result.position = newPosition;
        result.isOnSegmentLine = true;
    }

    return result;

}

function isInside  (point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point.x, y = point.y;

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i].x, yi = vs[i].y;
        var xj = vs[j].x, yj = vs[j].y;

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
}

module.exports = {
// Find intersection of RAY & SEGMENT
    getNewPoint: function (lastPosition, newPosition, polygon) {
        var segment, onSegmentLineData;
        for (var i = 0; i < polygon.length - 1; i++) {
            segment = [polygon[i], polygon[i + 1]];
            onSegmentLineData = getOnSegmentLine(newPosition, segment);
            if (onSegmentLineData.isOnSegmentLine) {
                return onSegmentLineData.position;
            }
        }

        return isInside(newPosition, polygon) ? newPosition : lastPosition;

    },

    isInside: isInside

};


},{}],6:[function(require,module,exports){
var g = require('./Utils/globals');

function AnimationManager(window, canvas) {
    var objectsToAnimate = [],
        ctx = canvas.getContext("2d");



    function animate() {
        ctx.clearRect(0,0,g.STAGE_WIDTH, g.STAGE_HEIGHT);
        objectsToAnimate.forEach(function (obj) {
            obj.onFrame(ctx);
        });
        window.requestAnimationFrame(animate);
    }

    function add(obj) {
        if ('onFrame' in obj) {
            objectsToAnimate.push(obj);
        } else {
            console.log("Failed Module: ", obj);
            throw new Error('obj need to implement onFrame() method');
        }
    }

    return {
        add: add,
        animate: animate
    }
}

module.exports = AnimationManager;
},{"./Utils/globals":3}],7:[function(require,module,exports){
var g = require('./Utils/globals');
var Stage = require('./Stage/stage');
var Hero = require('./Hero/hero');
var AnimationManager = require('./animationManager');

function App() {
    var canvas = document.getElementById('main-canvas'),
        hero = new Hero(),
        animationManager = new AnimationManager(window, canvas);

    function init() {
        setUp(canvas);
        hero.subscribe(Stage.eventHandler);
        animationManager.add(Stage);
        animationManager.add(hero);
        animationManager.animate();
        window.addEventListener('keydown', hero.onKeyDown, false);
    }

    function setUp(canvas) {
        canvas.height = g.STAGE_HEIGHT;
        canvas.width = g.STAGE_WIDTH;
    }

    init();
}

App();


},{"./Hero/hero":1,"./Stage/stage":2,"./Utils/globals":3,"./animationManager":6}]},{},[7]);
