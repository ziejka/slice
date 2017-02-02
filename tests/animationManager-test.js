var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var assert = chai.assert;
var Am = require('./../src/animationManager');

describe('Animation Manager tests:', function () {
    var canvas = {getContext: sinon.stub()},
        window = {requestAnimationFrame: sinon.stub()},
        animationManager = new Am(window, canvas);

    it('should throw error when try to add object without draw() implemented', function () {
        var fakeObj = {};
        expect(animationManager.add.bind(animationManager, fakeObj)).to.throw('obj need to implement draw method');
    });

    it('should add obj without error ', function () {
        var fakeObj = {
            draw: function () {
            }
        };
        expect(animationManager.add.bind(animationManager, fakeObj)).to.not.throw('obj need to implement draw method');
    });

    it('should call draw methods', function () {
        var fakeObj = {
            draw: sinon.spy()
        };
        animationManager.add(fakeObj);
        animationManager.animate();
        assert(fakeObj.draw.called);
    });
});