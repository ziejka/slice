// app.js

var game = function() {

    var ennemys = [];
    for (var i = 0; i < 10; i++) {
        ennemys.push(new Ennemy());
    }
    var hero = new Hero();

    function animate() {
        bg.drawBg();
        hero.drawHero();
        for (var i = 0; i < ennemys.length; i++) {
            actions.bouncing(ennemys[i]);
        };
        window.requestAnimationFrame(animate);
    }

    function init() {
        canvas.setStage();
        bg.drawBg();
        hero.drawHero();        
        for (var i = 0; i < ennemys.length; i++) {
            actions.drawBall(ennemys[i], Math.random() * stage.width, Math.random() * stage.height);
        };
        window.addEventListener('keydown', hero.doKeyDown, false);
        window.requestAnimationFrame(animate);
    }

    init();
}();
