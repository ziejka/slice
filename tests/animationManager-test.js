var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var assert = chai.assert;
var Am = require('./../src/animationManager');

describe('Animation Manager tests:', function () {
    var ctx = {clearRect: sinon.stub()},
        canvas = {
            getContext: function () {
                return ctx
            }
        },
        window = {requestAnimationFrame: sinon.stub()},
        animationManager = new Am(window, canvas);

    it('should throw error when try to add object without draw() implemented', function () {
        var fakeObj = {};
        expect(animationManager.add.bind(animationManager, fakeObj)).to.throw('obj need to implement onFrame() method');
    });

    it('should add obj without error ', function () {
        var fakeObj = {
            onFrame: sinon.spy()
        };
        expect(animationManager.add.bind(animationManager, fakeObj)).to.not.throw('obj need to implement onFrame() method');
    });

    it('should call draw methods', function () {
        var fakeObj = {
            onFrame: sinon.spy()
        };
        animationManager.add(fakeObj);
        animationManager.animate();
        assert(fakeObj.onFrame.called);
    });
});