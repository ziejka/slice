var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var assert = chai.assert;
var Hero = require('../src/Hero/hero');
var Stage = require('./../src/Stage/stage');
var utils = require('./../src/Utils/utils');

describe('Stage tests:', function() {
    var path, firstPoint;

    beforeEach(function() {
        path = [
	        { x: 0, y: 0 }, 
	        { x: 1, y: 0 },
	        { x: 2, y: 0 },
	        { x: 2, y: 3 },
	        { x: 2, y: 3 },
	        { x: 2, y: 100 }
        ];

        firstPoint = { x: 2, y: 0 };

        Stage.stagePoints = [
        	{ x: 0, y: 0 },
        	{ x: 100, y: 0 }, 
        	{ x: 100, y: 100 },
        	{ x: 0, y: 100}
		];
    });

    it("should return point if next is not on segment polygon", function() {
        expect(Stage._getStartPoint(path)).to.deep.equal(firstPoint);
    });

    it("should get index of polygon before point", function() {
        expect(Stage._getIndexBefore(firstPoint)).to.equal(0);
    });
});