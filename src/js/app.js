// app.js

var game = function() {
    var en1 = new Ennemy();
    var en2 = new Ennemy();
    var hero = new Hero();

    function animate() {
        bg.drawBg();
        hero.drawHero();
        en1.bouncing();
        en2.bouncing();
        window.requestAnimationFrame(animate);
    }

    function init() {
        canvas.setStage();
        bg.drawBg();
        hero.drawHero();
        en1.draw_ball(Math.random() * stage.width, Math.random() * stage.height);
        en2.draw_ball(Math.random() * stage.width, Math.random() * stage.height);
        window.addEventListener('keydown', hero.doKeyDown, true);
        window.requestAnimationFrame(animate);
    }

    init();
}();