var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var utils = require('../src/Utils/utils');

describe('Utils tests:', function () {
    var polygon = [
            {x: 10, y: 0},
            {x: 10, y: 10},
            {x: 0, y: 10},
            {x: 0, y: 40},
            {x: 20, y: 40},
            {x: 20, y: 90},
            {x: 50, y: 90},
            {x: 50, y: 80},
            {x: 40, y: 80},
            {x: 40, y: 60},
            {x: 50, y: 60},
            {x: 50, y: 50},
            {x: 70, y: 50},
            {x: 70, y: 60},
            {x: 60, y: 60},
            {x: 60, y: 70},
            {x: 70, y: 70},
            {x: 70, y: 80},
            {x: 80, y: 80},
            {x: 80, y: 50},
            {x: 90, y: 50},
            {x: 90, y: 20},
            {x: 60, y: 20},
            {x: 60, y: 30},
            {x: 50, y: 30},
            {x: 50, y: 0}
        ],
        point = {x: 0, y: 0};


    it('should poperly determind inside, outside', function () {
        expect(utils.isInside(point, polygon)).to.equal(false);
        point = {x: 10, y: 0};
        expect(utils.isInside(point, polygon)).to.equal(true);
        point = {x: 10, y: 39};
        expect(utils.isInside(point, polygon)).to.equal(true);
        point = {x: 20, y: 40};
        expect(utils.isInside(point, polygon)).to.equal(true);
        point = {x: 21, y: 89};
        expect(utils.isInside(point, polygon)).to.equal(true);
        point = {x: 55, y: 12};
        expect(utils.isInside(point, polygon)).to.equal(false);
        point = {x: -10, y: 20};
        expect(utils.isInside(point, polygon)).to.equal(false);
        point = {x: 20, y: -20};
        expect(utils.isInside(point, polygon)).to.equal(false);
        point = {x: 69, y: 71};
        expect(utils.isInside(point, polygon)).to.equal(false);
        point = {x: 70, y: 70};
        expect(utils.isInside(point, polygon)).to.equal(true);
        point = {x: 65, y: 69};
        expect(utils.isInside(point, polygon)).to.equal(true);
        point = {x: 70, y: 60};
        expect(utils.isInside(point, polygon)).to.equal(true);
        point = {x: 80, y: 80};
        expect(utils.isInside(point, polygon)).to.equal(true);
        point = {x: 90, y: 30};
        expect(utils.isInside(point, polygon)).to.equal(true);
        point = {x: 60, y: 80};
        expect(utils.isInside(point, polygon)).to.equal(false);
        point = {x: 50, y: 90};
        expect(utils.isInside(point, polygon)).to.equal(true);
        point = {x: 20, y: 90};
        expect(utils.isInside(point, polygon)).to.equal(true);
    });

    it('should get point on polygon line', function () {
        var speed = 5,
            lastPoint = {x: 0, y: 0},
            newPoint = {x: 5, y: 0};
        expect(utils.getNewPoint(newPoint, lastPoint, polygon, speed).position).to.deep.equal({x: 5, y: 0});
        lastPoint = {x: 5, y: 5};
        newPoint = {x: 14, y: 5};
        expect(utils.getNewPoint(newPoint, lastPoint, polygon, speed).position).to.deep.equal({x: 10, y: 5, onSegment: true});
        lastPoint = {x: 48, y: 90};
        newPoint = {x: 53, y: 90};
        expect(utils.getNewPoint(newPoint, lastPoint, polygon, speed).position).to.deep.equal({x: 50, y: 90, onSegment: true});
        lastPoint = {x: 63, y: 62};
        newPoint = {x: 63, y: 58};
        expect(utils.getNewPoint(newPoint, lastPoint, polygon, speed).position).to.deep.equal({x: 63, y: 60, onSegment: true});

    });

    it("should identify if point is between", function () {
        var point = {x: 1, y: 0},
            a = {x: 0, y: 0},
            b = {x: 20, y: 0};
        expect(utils.isPointBetween(point, a, b)).to.equal(true);
        point = {x: 0, y: 0};
        a = {x: 0, y: 0};
        b = {x: 20, y: 0};
        expect(utils.isPointBetween(point, a, b)).to.equal(false);
        point = {x: -2, y: 0};
        a = {x: 0, y: 0};
        b = {x: 20, y: 0};
        expect(utils.isPointBetween(point, a, b)).to.equal(false);
        point = {x: 0, y: 2};
        a = {x: 0, y: 0};
        b = {x: 0, y: 10};
        expect(utils.isPointBetween(point, a, b)).to.equal(true);
        point = {x: 1, y: 1};
        a = {x: 0, y: 2};
        b = {x: 0, y: 10};
        expect(utils.isPointBetween(point, a, b)).to.equal(false);
    });

    it("should get index of polygon after point", function() {
        stagePoints = [
            { x: 0, y: 0 },
            { x: 100, y: 0 },
            { x: 100, y: 100 },
            { x: 80, y: 100 },
            { x: 80, y: 50 },
            { x: 40, y: 50 },
            { x: 40, y: 100 },
            { x: 0, y: 100}
        ];
        firstPoint = { x: 20, y: 0 };
        expect(utils.getIndexAfter(firstPoint, stagePoints)).to.equal(1);
        firstPoint = { x: 100, y: 20 };
        expect(utils.getIndexAfter(firstPoint, stagePoints)).to.equal(2);
        firstPoint = { x: 0, y: 20 };
        expect(utils.getIndexAfter(firstPoint, stagePoints)).to.equal(8);
        firstPoint = { x: 80, y: 50 };
        expect(utils.getIndexAfter(firstPoint, stagePoints)).to.equal(5);
        firstPoint = { x: 40, y: 50 };
        expect(utils.getIndexAfter(firstPoint, stagePoints)).to.equal(6);
        firstPoint = { x: 10, y: 100 };
        expect(utils.getIndexAfter(firstPoint, stagePoints)).to.equal(7);
    });
});