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
        // hero.subscribe(Stage.eventHandler);
        animationManager.add(Stage);
        animationManager.add(hero);
        animationManager.animate();
        window.addEventListener('keydown', function (e) {
                hero.onKeyDown(e)
        }, false);
    }

    function setUp(canvas) {
        canvas.height = g.STAGE_HEIGHT;
        canvas.width = g.STAGE_WIDTH;
    }

    init();
}

App();

