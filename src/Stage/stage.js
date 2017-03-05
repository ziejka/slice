var g = require('../Utils/globals');

var Stage = {
    stagePoints: [
        {x: 0, y: 0},
        {x: g.STAGE_WIDTH, y: 0},
        {x: g.STAGE_WIDTH, y: g.STAGE_HEIGHT},
        {x: 0, y: g.STAGE_HEIGHT}
    ],

    drawBg: function (ctx) {
        ctx.fillStyle = g.STAGE_BG;
        ctx.fillRect(0, 0, g.STAGE_WIDTH, g.STAGE_HEIGHT);
    },

    onFrame: function (ctx) {
        this.drawBg(ctx);
    },

    eventHandler: function () {

    }

};

module.exports = Stage;