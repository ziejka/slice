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