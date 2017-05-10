var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var Hero = require('./../src/Hero/hero');
var Stage = require('./../src/Stage/stage');

describe('Hero tests:', function () {

    Stage.stagePoints = [
        {x: 0, y: 0},
        {x: 100, y: 0},
        {x: 100, y: 100},
        {x: 0, y: 100}
    ]

    var hero = new Hero(Stage),
        speed = 5;

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
        hero.__test._moveRight();
        hero.__test._moveRight();
        hero.__test._moveLeft();
        hero.__test._moveDown();
        hero.__test._moveDown();
        hero.__test._moveUp();
        position.x += speed;
        position.y += speed;
        expect(hero.getPosition()).to.deep.equal(position);
    });

    it('should reset hero position', function () {
        var position = {x: 0, y: 0};
        hero.__test._moveRight();
        hero.__test._moveDown();
        hero.resetPosition();
        expect(hero.getPosition()).to.deep.equal(position);
    });

    it('should move on key down', function () {
        var ctx = {fillRect: sinon.spy()},
            evt = {
                preventDefault: sinon.spy(),
                keyCode: 40
            },
            spyMoveDown = sinon.spy(hero.__test, "_moveDown");

        hero.onKeyDown(evt);
        hero.onFrame(ctx);
        expect(hero.__test._getMoving.down).to.equal(true);
    });

    it('should move position of speed', function () {
        var heroPosition = Object.assign({}, hero.getPosition());
        hero.__test._moveUp();
        heroPosition.y -= speed;
        expect(heroPosition).to.deep.equal(hero.getPosition());
        hero.__test._moveDown();
        heroPosition.y += speed;
        expect(heroPosition).to.deep.equal(hero.getPosition());
        hero.__test._moveLeft();
        heroPosition.x -= speed;
        expect(heroPosition).to.deep.equal(hero.getPosition());
        hero.__test._moveRight();
        heroPosition.x += speed;
        expect(heroPosition).to.deep.equal(hero.getPosition());
    });

    it("should add point to heroPath if is not moving on wall", function () {
        var ctx = {fillRect: sinon.spy()},
            evt = {
                preventDefault: sinon.spy(),
                keyCode: 39 // right arrow
            };
    });
});


