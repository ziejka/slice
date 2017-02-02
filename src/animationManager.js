function AnimationManager(window, canvas) {
    var objectsToAnimate = [],
        ctx = canvas.getContext("2d");

    function animate() {
        objectsToAnimate.forEach(function (obj) {
            obj.draw(ctx);
        });
        window.requestAnimationFrame(animate);
    }

    function add(obj) {
        if ('draw' in obj) {
            objectsToAnimate.push(obj);
        } else {
            console.log(obj);
            throw new Error('obj need to implement draw method');
        }
    }

    return {
        add: add,
        animate: animate
    }
}

module.exports = AnimationManager;