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
});