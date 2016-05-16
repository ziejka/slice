// bonus.js

var Bonus = function () {
	this.x;
	this.y;
	this.r = 8;
	this.restart = function () {
		  this.x = helpers.generateRandom(stage.width);
		  this.y = helpers.generateRandom(stage.height);
	}
}

var bonusActios = function () {

	function drawBonus(bonus) {
		ctx.fillStyle = BONUS_COLOR;
        helpers.drawCircle(bonus.x, bonus.y, bonus.r);
	}

	 return {
	 	drawBonus: drawBonus
	 }
}();