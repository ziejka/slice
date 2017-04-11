function getOnSegmentLine(newPosition, lastPosition, segment) {
    var max, min,
        vertical = segment[0].x === segment[1].x,
        result = {
            position: {},
            isOnSegmentLine: false
        };

    if (vertical && newPosition.x === segment[0].x) {
        max = Math.max(segment[0].y, segment[1].y);
        min = Math.min(segment[0].y, segment[1].y);

        if(lastPosition.y < min || lastPosition.y > max ) {
            return result;
        }

        if (newPosition.y > max) {
            newPosition.y = max
        } else if (newPosition.y < min) {
            newPosition.y = min
        }
        result.position = newPosition;
        result.isOnSegmentLine = true;

    } else if (newPosition.y === segment[0].y) {
        max = Math.max(segment[0].x, segment[1].x);
        min = Math.min(segment[0].x, segment[1].x);

        if(lastPosition.x < min || lastPosition.x > max ) {
            return result;
        }

        if (newPosition.x > max) {
            newPosition.x = max
        } else if (newPosition.x < min) {
            newPosition.x = min;
        }
        result.position = newPosition;
        result.isOnSegmentLine = true;
    }

    return result;

}

function isInside(point, lastPoint, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point.x, y = point.y;

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i].x, yi = vs[i].y;
        var xj = vs[j].x, yj = vs[j].y;

        var intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    if (!inside) {
        var segment, onSegmentLineData;
        for (var i = 0; i < vs.length - 1; i++) {
            segment = [vs[i], vs[i + 1]];
            onSegmentLineData = getOnSegmentLine(point, lastPoint, segment);
            if (onSegmentLineData.isOnSegmentLine) {
                inside = true;
            }
        }
    }

    return inside;
}

module.exports = {
// Find intersection of RAY & SEGMENT
    getNewPoint: function (lastPosition, newPosition, polygon) {
        var segment, onSegmentLineData;
        for (var i = 0; i < polygon.length - 1; i++) {
            segment = [polygon[i], polygon[i + 1]];
            onSegmentLineData = getOnSegmentLine(newPosition, segment);
            if (onSegmentLineData.isOnSegmentLine) {
                return onSegmentLineData.position;
            }
        }

        return isInside(newPosition, polygon) ? newPosition : lastPosition;

    },

    isInside: isInside

};

