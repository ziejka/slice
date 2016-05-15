// app.js

var game = function(argument) {
	var en1 = new Ennemy();
	var en2 = new Ennemy();
	var hero = new Hero();

    function animate() {
        bg.draw_bg();
        hero.draw_hero();
        en1.bouncing();
        en2.bouncing();
        window.requestAnimationFrame(animate);
    }

    function init() {
        canvas.set_stage();
        bg.draw_bg();
        hero.draw_hero();
        en1.draw_ball(Math.random() * stage.width, Math.random() * stage.height);
        en2.draw_ball(Math.random() * stage.width, Math.random() * stage.height);
        // ennemy.draw_ball(Math.random() * 200, Math.random() * 200);
        window.addEventListener('keydown',hero.doKeyDown,true);
        window.requestAnimationFrame(animate);

    }

    init();
}();