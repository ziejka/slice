var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var assert = chai.assert;
var Hero = require('../src/Hero/hero');
var stage = require('./../src/Stage/stage');
var g = require('./../src/Utils/globals');

describe('Stage tests:', function () {
    var canvas = {width: 0, height: 0},
        hero = new Hero();

    // stage.onHeroTouchBoundries = sinon.spy();
    hero.subscribe(stage.onHeroTouchBoundries);

    it('shoukd set up stage width and height', function () {
        // expect(canvas.width).to.equal(g.STAGE_WIDTH);
    });

    it('shoukd invoke event', function () {
        // hero.moveUp();
        // assert(stage.onHeroTouchBoundries.called);
    });

});