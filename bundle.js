(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

    function getIntersectinPoint(lastPosition, position) {
        var segment,
            intersectionPoint,
            rey = {a: lastPosition, b: position};

        for (var i = 0; i < Stage.stagePoints.length - 1; i++) {
            segment = {a: Stage.stagePoints[i], b: Stage.stagePoints[i + 1]};
            intersectionPoint = utils.getIntersection(rey, segment);
            if (intersectionPoint) {
                break;
            }
        }
        return intersectionPoint;
    }

    function move() {
        var me = this,
            newPoint,
            lastPosition = me.getPosition();

        for (var key in moving) {
            if (moving[key]) {
                moveInDirection.call(me, key);
            }
        }
        newPoint = me.getPosition();

        if (JSON.stringify(newPoint) === JSON.stringify(lastPosition)) {
            return;
        }

        if (!me.isOnSegmentLine) {
            var interactionData = getIntersectinPoint(lastPosition, me.getPosition());
            if (interactionData.linesIntersect) {
                newPoint = { x: interactionData.x, y: interactionData.y};
                me.isOnSegmentLine = true;
            }

        } else if (!utils.isInside(me.getPosition(), Stage.stagePoints)) {
            newPoint = lastPosition;
        } else {
            me.isOnSegmentLine = false;
        }

        me.x = newPoint.x;
        me.y = newPoint.y;
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

// function Stage(canvas) {
//     var stagePoints = [
//         {x: 0, y: 0},
//         {x: g.STAGE_WIDTH, y: 0},
//         {x: g.STAGE_WIDTH, y: g.STAGE_HEIGHT},
//         {x: 0, y: g.STAGE_HEIGHT}
//     ];
//
//     function drawBg(ctx) {
//         ctx.fillStyle = g.STAGE_BG;
//         ctx.fillRect(0, 0, g.STAGE_WIDTH, g.STAGE_HEIGHT);
//     }
//
//     this.getPolygon = function () {
//         return stagePoints;
//     };
//
//     this.onFrame = function (ctx) {
//         drawBg(ctx);
//     };
//
//     this.eventHandler = function (arg) {
//
//     };
//
//     setUp();
// }

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
module.exports = {
// Find intersection of RAY & SEGMENT
    getIntersection: function (ray, segment) {


        return checkLineIntersection(
            ray.a.x, ray.a.y, ray.b.x, ray.b.y,
            segment.a.x, segment.a.y, segment.b.x, segment.b.y);
        // RAY in parametric: Point + Delta*T1
        // var r_px = ray.a.x;
        // var r_py = ray.a.y;
        // var r_dx = ray.b.x - ray.a.x;
        // var r_dy = ray.b.y - ray.a.y;
        // // SEGMENT in parametric: Point + Delta*T2
        // var s_px = segment.a.x;
        // var s_py = segment.a.y;
        // var s_dx = segment.b.x - segment.a.x;
        // var s_dy = segment.b.y - segment.a.y;
        // // Are they parallel? If so, no intersect
        // var r_mag = Math.sqrt(r_dx * r_dx + r_dy * r_dy);
        // var s_mag = Math.sqrt(s_dx * s_dx + s_dy * s_dy);
        // if (r_dx / r_mag == s_dx / s_mag && r_dy / r_mag == s_dy / s_mag) {
        //     // Unit vectors are the same.
        //     return null;
        // }
        // // SOLVE FOR T1 & T2
        // // r_px+r_dx*T1 = s_px+s_dx*T2 && r_py+r_dy*T1 = s_py+s_dy*T2
        // // ==> T1 = (s_px+s_dx*T2-r_px)/r_dx = (s_py+s_dy*T2-r_py)/r_dy
        // // ==> s_px*r_dy + s_dx*T2*r_dy - r_px*r_dy = s_py*r_dx + s_dy*T2*r_dx - r_py*r_dx
        // // ==> T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx)
        // var T2 = (r_dx * (s_py - r_py) + r_dy * (r_px - s_px)) / (s_dx * r_dy - s_dy * r_dx);
        // var T1 = (s_px + s_dx * T2 - r_px) / r_dx;
        // // Must be within parametic whatevers for RAY/SEGMENT
        // if (T1 < 0) return null;
        // if (T2 < 0 || T2 > 1) return null;
        // // Return the POINT OF INTERSECTION
        // return {
        //     x: r_px + r_dx * T1,
        //     y: r_py + r_dy * T1
        // };
    },

    isInside: function (point, vs) {
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
};

function checkLineIntersection(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    var denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false,
        linesIntersect: false
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator == 0) {
        return result;
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));
    /*
     // it is worth noting that this should be the same as:
     x = line2StartX + (b * (line2EndX - line2StartX));
     y = line2StartX + (b * (line2EndY - line2StartY));
     */
    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }

    result.linesIntersect = result.onLine1 && result.onLine2;
    // if line1 and line2 are segments, they intersect if both of the above are true
    return result;
}


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

    function setUp() {
        canvas.height = g.STAGE_HEIGHT;
        canvas.width = g.STAGE_WIDTH;
    }

    init();
}

App();


},{"./Hero/hero":1,"./Stage/stage":2,"./Utils/globals":3,"./animationManager":6}]},{},[7]);
