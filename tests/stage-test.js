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
	    Stage.stagePoints = [
	        	{ x: 0, y: 0 },
	        	{ x: 100, y: 0 }, 
	        	{ x: 100, y: 100 },
	        	{ x: 0, y: 100}
			];  
    });

    it("should return point if next is not on segment polygon", function() {
    	path = [
	        { x: 0, y: 0 }, 
	        { x: 1, y: 0 },
	        { x: 2, y: 0 },
	        { x: 2, y: 3 },
	        { x: 2, y: 3 },
	        { x: 2, y: 100 }
        ];
        firstPoint = { x: 2, y: 0 };        
        expect(Stage._getStartPoint(path)).to.deep.equal(firstPoint);
        path = [
	        { x: 10, y: 0 }, 
	        { x: 10, y: 100 }	       
        ];
        firstPoint = { x: 10, y: 0 };
        expect(Stage._getStartPoint(path)).to.deep.equal(firstPoint);
    });

    it("should get index of polygon after point", function() {
    	Stage.stagePoints = [
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
        expect(Stage._getIndexAfter(firstPoint)).to.equal(1);
        firstPoint = { x: 100, y: 20 };
        expect(Stage._getIndexAfter(firstPoint)).to.equal(2);
        firstPoint = { x: 0, y: 20 };
        expect(Stage._getIndexAfter(firstPoint)).to.equal(8);
        firstPoint = { x: 80, y: 50 };
        expect(Stage._getIndexAfter(firstPoint)).to.equal(5);
        firstPoint = { x: 40, y: 50 };
        expect(Stage._getIndexAfter(firstPoint)).to.equal(6);
        firstPoint = { x: 10, y: 100 };
        expect(Stage._getIndexAfter(firstPoint)).to.equal(7);
    });

    it("should add newPath to stagePoints", function() {
    	var newPath, stagePoints;
    	Stage.stagePoints = [
        	{ x: 0, y: 0 },
        	{ x: 100, y: 0 }, 
        	{ x: 100, y: 100 },
        	{ x: 80, y: 100 },
        	{ x: 80, y: 50 },
        	{ x: 40, y: 50 },
        	{ x: 40, y: 100 },
        	{ x: 0, y: 100}
		];
		newPath = [
			{ x: 10, y: 0 },
			{ x: 10, y: 20 },
			{ x: 100, y: 20 }
		];
		stagePoints = [
			{ x: 0, y: 0 },
			{ x: 10, y: 0 },
			{ x: 10, y: 20 },
			{ x: 100, y: 20 },
        	{ x: 100, y: 100 },
        	{ x: 80, y: 100 },
        	{ x: 80, y: 50 },
        	{ x: 40, y: 50 },
        	{ x: 40, y: 100 },
        	{ x: 0, y: 100}
		];

		Stage.addNewPath(newPath);
		expect(Stage.stagePoints).to.deep.equal(stagePoints);

		Stage.stagePoints = [
        	{ x: 0, y: 0 },
        	{ x: 100, y: 0 }, 
        	{ x: 100, y: 100 },
        	{ x: 80, y: 100 },
        	{ x: 80, y: 50 },
        	{ x: 40, y: 50 },
        	{ x: 40, y: 100 },
        	{ x: 0, y: 100}
		];
		newPath = [
			{ x: 10, y: 0 },
			{ x: 10, y: 100 }
		];
		stagePoints = [
        	{ x: 0, y: 0 },
        	{ x: 10, y: 0 },
			{ x: 10, y: 100 },
        	{ x: 0, y: 100}
		];

		Stage.addNewPath(newPath);
		expect(Stage.stagePoints).to.deep.equal(stagePoints);

    });
});