var g = require('../Utils/globals');

var Stage = {
    stagePoints: [
        {x: 0, y: 0},
        {x: 300, y: 0},
        {x: 300, y: 300},
        {x: 400, y: 300},
        {x: 400, y: 0},
        {x: g.STAGE_WIDTH, y: 0},
        {x: g.STAGE_WIDTH, y: 500},
        {x: 500, y: 500},
        {x: 500, y: g.STAGE_HEIGHT},
        {x: 0, y: g.STAGE_HEIGHT}
    ],
    // {x: g.STAGE_WIDTH, y: g.STAGE_HEIGHT},

    drawBg: function (ctx) {
        ctx.fillStyle = g.STAGE_BG;
        ctx.beginPath();
        ctx.moveTo(this.stagePoints[0].x, this.stagePoints[0].y);
        for (var i = 1; i < this.stagePoints.length; i++) {
            var obj = this.stagePoints[i];
            ctx.lineTo(obj.x, obj.y);
        }
        ctx.closePath();
        ctx.fill();
    },

    onFrame: function (ctx) {
        this.drawBg(ctx);
    },

    eventHandler: function () {

    }

};

module.exports = Stage;