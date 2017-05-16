var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var assert = chai.assert;
var Hero = require('./../src/Hero/hero');
var Stage = require('./../src/Stage/stage');

describe('Hero tests:', function() {

     Stage.stagePoints = [
            { x: 0, y: 0 },
            { x: 100, y: 0 }, 
            { x: 100, y: 100 },
            { x: 0, y: 100}
        ];

    Stage.addNewPath = sinon.spy();

    var hero = new Hero(Stage),
        speed = 5;

    beforeEach(function() {
        hero.resetPosition();
        hero.__test._resetPathPoints();
        Stage.addNewPath.reset()
    });

    it('should return hero with and height', function() {
        //noinspection BadExpressionStatementJS
        expect(hero).to.exist;
    });

    it('should return hero position', function() {
        var position = {
            x: 0,
            y: 0
        };
        expect(hero.getPosition()).to.deep.equal(position);
    });

    it('should move hero position of speed', function() {
        var position = {
            x: 0,
            y: 0
        };
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

    it('should reset hero position', function() {
        var position = {
            x: 0,
            y: 0
        };
        hero.__test._moveRight();
        hero.__test._moveDown();
        hero.resetPosition();
        expect(hero.getPosition()).to.deep.equal(position);
    });

    it('should move on key down', function() {
        var ctx = {
                fillRect: sinon.spy()
            },
            evt = {
                preventDefault: sinon.spy(),
                keyCode: 40
            },
            spyMoveDown = sinon.spy(hero.__test, "_moveDown");

        hero.onKeyDown(evt);
        hero.onFrame(ctx);
        expect(hero.__test._getMoving.down).to.equal(true);
    });

    it('should move position of speed', function() {
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

    it("should add point to heroPath on arrowDown if is not moving on wall", function() {
        var evt = {
                preventDefault: sinon.spy(),
                keyCode: 39 // right arrow
            },
            expected = [{
                x: 10,
                y: 10
            }];

        hero.__test._getPosition.x = 10;
        hero.__test._getPosition.y = 10;
        hero.onKeyDown(evt);
        expect(hero.__test._getHeroPath()).to.deep.equal(expected);
    });

    it("should NOT add point to heroPath when moving on wall", function() {
        var evt = {
                preventDefault: sinon.spy(),
                keyCode: 39 // right arrow
            },
            expected = [];
        hero.onKeyDown(evt);
        expect(hero.__test._getHeroPath()).to.deep.equal(expected);
    });

    it("should clear heroPath", function() {
        var testPath = [{
                x: 0,
                y: 0
            }, {
                x: 10,
                y: 10
            }, ],
            testPoint = {
                x: 2,
                y: 2
            }
        hero.__test._addPathPoint(testPath[0]);
        hero.__test._addPathPoint(testPath[1]);
        expect(hero.__test._getHeroPath()).to.deep.equal(testPath);

        hero.__test._onHitWall.call(hero, testPoint);
        expect(hero.__test._getHeroPath.length).to.equal(0);
    });

    it("should call Stage.addNewPath on wall hit", function() {
        var testPoint = {
            x: 2,
            y: 2
        }
        hero.__test._onHitWall.call(hero, testPoint);
        assert(Stage.addNewPath.calledOnce);
    });
});