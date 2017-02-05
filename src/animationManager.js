var g = require('./Utils/globals');

function AnimationManager(window, canvas) {
    var objectsToAnimate = [],
        ctx = canvas.getContext("2d");



    function animate() {
        ctx.clearRect(0,0,g.STAGE_WIDTH, g.STAGE_HEIGHT);
        objectsToAnimate.forEach(function (obj) {
            obj.onFrame(ctx);
        });
        window.requestAnimationFrame(animate);
    }

    function add(obj) {
        if ('onFrame' in obj) {
            objectsToAnimate.push(obj);
        } else {
            console.log("Failed Module: ", obj);
            throw new Error('obj need to implement onFrame() method');
        }
    }

    return {
        add: add,
        animate: animate
    }
}

module.exports = AnimationManager;