var chai = require('chai');
var expect = chai.expect;
var Stage = require('./../src/Stage/stage');
var g = require('./../src/Utils/globals');

describe('Stage tests:', function () {
    var canvas = {width: 0, height: 0},
        stage = new Stage(canvas);

    it('shoukd set up stage width and height', function () {
        expect(canvas.width).to.equal(g.STAGE_WIDTH);
    });

});