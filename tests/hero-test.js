var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var Hero = require('./../src/Hero/hero');
var g = require('./../src/Utils/globals');

describe('Hero tests:', function () {

    var hero = new Hero(),
        speed = g.HERO_SPEED;

    beforeEach(function () {
        hero.resetPosition();
    });

    it('should return hero with and height', function () {
        //noinspection BadExpressionStatementJS
        expect(hero).to.exist;
    });

    it('should return hero position', function () {
        var position = {x: 0, y: 0};
        expect(hero.getPosition()).to.deep.equal(position);
    });

    it('should move hero position of speed', function () {
        var position = {x: 0, y: 0};
        expect(hero.getPosition()).to.deep.equal(position);
        hero.moveRight();
        hero.moveRight();
        hero.moveLeft();
        hero.moveDown();
        hero.moveDown();
        hero.moveUp();
        position.x += speed;
        position.y += speed;
        expect(hero.getPosition()).to.deep.equal(position);
    });

    it('should reset hero position', function () {
        var position = {x: 0, y: 0};
        hero.moveRight();
        hero.moveDown();
        hero.resetPosition();
        expect(hero.getPosition()).to.deep.equal(position);
    });

    it('should move only on stage', function () {
        var position = {x: 0, y: 0},
            repeatNumber = 1000;
        hero.moveLeft();
        hero.moveUp();
        expect(hero.getPosition()).to.deep.equal(position);
        position = {x: g.STAGE_WIDTH, y: g.STAGE_HEIGHT};
        for (var i = 0; i < repeatNumber; i++) {
            hero.moveRight();
            hero.moveDown();
        }
        expect(hero.getPosition()).to.deep.equal(position);
    });

    it('should move on key down', function () {
        var position = {x: 0, y: g.HERO_SPEED},
            repeatNumber = 1000,
            ctx = {fillRect: sinon.spy()},
            evt = {
                preventDefault: sinon.spy(),
                keyCode: 40
            };
        hero.onKeyDown(evt);
        hero.onFrame(ctx);
        expect(hero.getPosition()).to.deep.equal(position);
        hero.onFrame(ctx);
        position.y += g.HERO_SPEED;
        expect(hero.getPosition()).to.deep.equal(position);
        evt = {
            preventDefault: sinon.spy(),
            keyCode: 39
        };
        hero.onKeyDown(evt);
        for (var i = 0; i < repeatNumber; i++) {
            hero.onFrame(ctx);
        }
        position.x = g.STAGE_WIDTH;
        expect(hero.getPosition()).to.deep.equal(position);
    });

});


