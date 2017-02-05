var g = require('../Utils/globals');

function Stage(canvas) {
    var stagePoints = [
        {x: 0, y: 0},
        {x: g.STAGE_WIDTH, y: 0},
        {x: g.STAGE_WIDTH, y: g.STAGE_HEIGHT},
        {x: 0, y: g.STAGE_HEIGHT}
    ];

    function setUp() {
        canvas.height = g.STAGE_HEIGHT;
        canvas.width = g.STAGE_WIDTH;
    }

    function drawBg(ctx) {
        ctx.fillStyle = g.STAGE_BG;
        ctx.fillRect(0, 0, g.STAGE_WIDTH, g.STAGE_HEIGHT);
    }

    this.getPolygon = function () {
        return stagePoints;
    };

    this.onFrame = function (ctx) {
        drawBg(ctx);
    };

    this.eventHandler = function (arg) {

    };

    setUp();
}

module.exports = Stage;