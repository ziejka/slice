// app.js

var game = function() {

    var ennemys = [];
    for (var i = 0; i < 5; i++) {
        ennemys.push(new Ennemy());
    }
    var hero = new Hero();
    var bonus = new Bonus(); 

    function animate() {
        bg.drawBg();
        hero.drawHero();
        bonusActios.drawBonus(bonus);
        for (var i = 0; i < ennemys.length; i++) {
            actions.bouncing(ennemys[i]);
            helpers.checkCollision(ennemys[i], hero.getHeroCords(), helpers.ennemyHit);
        };
        helpers.checkCollision(bonus, hero.getHeroCords(), helpers.bonusHit);
        window.requestAnimationFrame(animate);
    }

    function init() {
        canvas.setStage();
        bg.drawBg();
        hero.drawHero();
        bonus.restart();
        bonusActios.drawBonus(bonus);
        for (var i = 0; i < ennemys.length; i++) {
            actions.drawBall(ennemys[i], helpers.generateRandom(stage.width), helpers.generateRandom(stage.height));
        };
        window.addEventListener('keydown', hero.doKeyDown, false);
        animate();
    }

    init();
}();
