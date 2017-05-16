var g = require('../Utils/globals');
var utils = require('../Utils/utils');

var Stage = {
    stagePoints: [
        {x: 100, y: 0},
        {x: 100, y: 100},
        {x: 0, y: 100},
        {x: 0, y: 400},
        {x: 200, y: 400},
        {x: 200, y: 900},
        {x: 500, y: 900},
        {x: 500, y: 800},
        {x: 400, y: 800},
        {x: 400, y: 600},
        {x: 500, y: 600},
        {x: 500, y: 500},
        {x: 700, y: 500},
        {x: 700, y: 600},
        {x: 600, y: 600},
        {x: 600, y: 700},
        {x: 700, y: 700},
        {x: 700, y: 800},
        {x: 800, y: 800},
        {x: 800, y: 500},
        {x: 900, y: 500},
        {x: 900, y: 200},
        {x: 600, y: 200},
        {x: 600, y: 300},
        {x: 500, y: 300},
        {x: 500, y: 0}
    ],
    polygon: [
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

    eventHandler: function (args) {
        console.log(args);
    },

    addNewPath: function (newPath) {
        var startPoint = this._getStartPoint(newPath),
            startIndex = this._getIndexBefore(startPoint);

    },

    _getStartPoint: function (newPath) {
        var point = newPath.shift();
        if(!utils.isOnSegmentPoint(newPath[0], this.stagePoints)) {
            return point;
        } else {
            return this._getStartPoint(newPath);
        }        
    },

    _getIndexBefore: function (point) {
        var a, b;
        for (var i = 0; i < this.stagePoints.length - 1; i++) {
            a = this.stagePoints[i];
            b = this.stagePoints[i+1];

            utils.isPointBetween(point, a, b)
        };
    }
};

module.exports = Stage;