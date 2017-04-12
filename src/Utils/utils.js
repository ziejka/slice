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

    var i, x = point.x, y = point.y;

    var inside = false;
    for (i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i].x, yi = vs[i].y;
        var xj = vs[j].x, yj = vs[j].y;

        var intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    if (!inside) {
        var segment, onSegmentLineData;
        for (i = 0; i < vs.length - 1; i++) {
            segment = [vs[i], vs[i + 1]];
            onSegmentLineData = getOnSegmentLine(point, lastPoint, segment);
            if (onSegmentLineData.isOnSegmentLine) {
                inside = true;
            }
        }
    }

    return inside;
}

function getOnSegmentPoint(newPosition, lastPosition, polygon) {
    var segment, min, max,
        vertical = lastPosition.x === newPosition.x;

    for (i = 0; i < polygon.length; i++) {
        segment = [polygon[i], polygon[i + 1] || polygon[0]];

        if(vertical) {
            if(segment[0].y !== segment[1].y) {
                continue;
            }
            max = Math.max(segment[0].x, segment[1].x);
            min = Math.min(segment[0].x, segment[1].x);

            if(newPosition.x > max || newPosition.x < min) {
                continue;
            }

            max = Math.max(newPosition.y, lastPosition.y);
            min = Math.min(newPosition.y, lastPosition.y);

            if(max >= segment[0].y && min <= segment[0].y) {
                newPosition.y = segment[0].y;
                return newPosition;
            }
        } else {
            if(segment[0].x !== segment[1].x) {
                continue;
            }
            max = Math.max(segment[0].y, segment[1].y);
            min = Math.min(segment[0].y, segment[1].y);

            if(newPosition.y > max || newPosition.y < min) {
                continue;
            }

            max = Math.max(newPosition.x, lastPosition.x);
            min = Math.min(newPosition.x, lastPosition.x);

            if(max >= segment[0].x && min <= segment[0].x) {
                newPosition.x = segment[0].x;
                return newPosition;
            }
        }


    }
}

module.exports = {
    isInside: isInside,
    getOnSegmentPoint: getOnSegmentPoint

};

