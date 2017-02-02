(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"../Utils/globals":3}],2:[function(require,module,exports){
var g = require('../Utils/globals');

function Stage(canvas) {
    function setUp() {
        canvas.height = g.STAGE_HEIGHT;
        canvas.width = g.STAGE_WIDTH;
    }

    function draw(ctx) {
        ctx.fillStyle = g.STAGE_BG;
        ctx.fillRect(0, 0, g.STAGE_WIDTH, g.STAGE_HEIGHT);
    }

    setUp();

    return {
        draw: draw
    }
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
    STAGE_BG: 'rgba(51,51,51,0.3)',
    PLAYER_COLOR: '#cdcdcd',
    KEY_MAP: {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    }
};
},{}],4:[function(require,module,exports){
function AnimationManager(window, canvas) {
    var objectsToAnimate = [],
        ctx = canvas.getContext("2d");

    function animate() {
        objectsToAnimate.forEach(function (obj) {
            obj.draw(ctx);
        });
        window.requestAnimationFrame(animate);
    }

    function add(obj) {
        if ('draw' in obj) {
            objectsToAnimate.push(obj);
        } else {
            console.log(obj);
            throw new Error('obj need to implement draw method');
        }
    }

    return {
        add: add,
        animate: animate
    }
}

module.exports = AnimationManager;
},{}],5:[function(require,module,exports){
var Stage = require('./Stage/stage');
var Hero = require('./Hero/hero');
var AnimationManager = require('./animationManager');

function App() {
    var canvas = document.getElementById('main-canvas'),
        stage = new Stage(canvas),
        hero = new Hero(),
        animationManager = new AnimationManager(window, canvas);

    function init() {
        animationManager.add(stage);
        animationManager.add(hero);
        animationManager.animate();
        window.addEventListener('keydown', hero.onKeyDown, false);
    }

    init();
}

App();
},{"./Hero/hero":1,"./Stage/stage":2,"./animationManager":4}]},{},[5]);
