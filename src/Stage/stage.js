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