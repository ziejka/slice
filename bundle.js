(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"../Utils/globals":3,"../Utils/subject":4}],2:[function(require,module,exports){
var g = require('../Utils/globals');

function Stage(canvas) {
    var stagePoints = [
        {x: 0, y: 0},
        {x: g.STAGE_WIDTH, y: 0},
        {x: g.STAGE_WIDTH, y: g.STAGE_HEIGHT},
        {x: 0, y: g.STAGE_HEIGHT}
    ];

    function setUp() {
        canvas.height = g.STAGE_HEIGHT;
        canvas.width = g.STAGE_WIDTH;
    }

    function drawBg(ctx) {
        ctx.fillStyle = g.STAGE_BG;
        ctx.fillRect(0, 0, g.STAGE_WIDTH, g.STAGE_HEIGHT);
    }

    this.getPolygon = function () {
        return stagePoints;
    };

    this.onFrame = function (ctx) {
        drawBg(ctx);
    };

    this.eventHandler = function (arg) {

    };

    setUp();
}

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
},{"./Utils/globals":3}],6:[function(require,module,exports){
var Stage = require('./Stage/stage');
var Hero = require('./Hero/hero');
var AnimationManager = require('./animationManager');

function App() {
    var canvas = document.getElementById('main-canvas'),
        stage = new Stage(canvas),
        hero = new Hero(),
        animationManager = new AnimationManager(window, canvas);

    function init() {
        hero.subscribe(stage.eventHandler);
        animationManager.add(stage);
        animationManager.add(hero);
        animationManager.animate();
        window.addEventListener('keydown', hero.onKeyDown, false);
    }

    init();
}

App();


},{"./Hero/hero":1,"./Stage/stage":2,"./animationManager":5}]},{},[6]);
