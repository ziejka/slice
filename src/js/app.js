// app.js

var game = function() {

    var ennemys = [];
    for (var i = 0; i < 5; i++) {
        ennemys.push(new Ennemy());
    }
    var hero = new Hero();
    var enT = new Ennemy();

    function animate() {
        bg.drawBg();
        hero.drawHero();
        for (var i = 0; i < ennemys.length; i++) {
            actions.bouncing(ennemys[i]);
            actions.checkCollision(ennemys[i], hero.getHeroCords());
        };
        window.requestAnimationFrame(animate);
    }

    function init() {
        canvas.setStage();
        bg.drawBg();
        hero.drawHero();        
        for (var i = 0; i < ennemys.length; i++) {
            actions.drawBall(ennemys[i],Math.floor( Math.random() * stage.width), Math.floor(Math.random() * stage.height));
        };
        window.addEventListener('keydown', hero.doKeyDown, false);
        window.requestAnimationFrame(animate);        
    }

    init();
}();
