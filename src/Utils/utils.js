function checkIntersection(lastPosition, newPosition, segment) {
    var horizontal = segment[0].x === segment[1].x,
        result = {
            position: {},
            isOnSegmentLine: false
        };

    if (horizontal && lastPosition.x === segment[0].x) {
        result.position = newPosition;
        result.isOnSegmentLine = true;
        return result
    } else if (lastPosition.y === segment[0].y) {
        result.position = newPosition;
        result.isOnSegmentLine = true;
        return result
    }


}

module.exports = {
// Find intersection of RAY & SEGMENT
    getNewPoint: function (lastPosition, newPosition, polygon) {
        var segment;
        for (var i = 0; i < polygon.length - 1; i++) {
            segment = [polygon[i], polygon[i + 1]];
            checkIntersection(lastPosition, newPosition, segment);
        }

    },

    isInside: function (point, vs) {
        // ray-casting algorithm based on
        // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

        var x = point.x, y = point.y;

        var inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i].x, yi = vs[i].y;
            var xj = vs[j].x, yj = vs[j].y;

            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }

        return inside;
    }
};

