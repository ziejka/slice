function line_intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    var x, y, seg1, seg2, onSegment, ua, ub, denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    if (denom === 0) {
        return null;
    }
    ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
    ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;

    x = x1 + ua * (x2 - x1);
    y = y1 + ua * (y2 - y1);

    seg1 = ua >= 0 && ua <= 1;
    seg2 = ub >= 0 && ub <= 1;

    onSegment = seg1 && seg2;

    return {
        x: x,
        y: y,
        onSegment: onSegment
    };
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
    return inside;
}

function getNewPoint(newPosition, lastPosition, polygon, speed) {
    var segment, intersectionPoint,
        resutl = {
            position: newPosition,
            blockMove: false
        };
    for (i = 0; i < polygon.length; i++) {
        segment = [polygon[i], polygon[i + 1] || polygon[0]];
        intersectionPoint = line_intersect(lastPosition.x, lastPosition.y, newPosition.x, newPosition.y,
            segment[0].x, segment[0].y, segment[1].x, segment[1].y);
        if (!intersectionPoint || !intersectionPoint.onSegment) continue;
        var distance = Math.sqrt((newPosition.x - intersectionPoint.x) * (newPosition.x - intersectionPoint.x) + (newPosition.y - intersectionPoint.y) * (newPosition.y - intersectionPoint.y));
        if (distance < speed) {
            resutl = {
                position: intersectionPoint,
                blockMove: true
            };
        }
    }
    return resutl;
}

function getOnSegmentPoint(newPosition, lastPosition, polygon) {
    var segment, min, max,
        vertical = lastPosition.x === newPosition.x;

    for (i = 0; i < polygon.length; i++) {
        segment = [polygon[i], polygon[i + 1] || polygon[0]];

        if (vertical) {
            if (segment[0].y !== segment[1].y) {
                continue;
            }
            max = Math.max(segment[0].x, segment[1].x);
            min = Math.min(segment[0].x, segment[1].x);

            if (newPosition.x > max || newPosition.x < min) {
                continue;
            }

            max = Math.max(newPosition.y, lastPosition.y);
            min = Math.min(newPosition.y, lastPosition.y);

            if (max >= segment[0].y && min <= segment[0].y) {
                newPosition.y = segment[0].y;
                return newPosition;
            }
        } else {
            if (segment[0].x !== segment[1].x) {
                continue;
            }
            max = Math.max(segment[0].y, segment[1].y);
            min = Math.min(segment[0].y, segment[1].y);

            if (newPosition.y > max || newPosition.y < min) {
                continue;
            }

            max = Math.max(newPosition.x, lastPosition.x);
            min = Math.min(newPosition.x, lastPosition.x);

            if (max >= segment[0].x && min <= segment[0].x) {
                newPosition.x = segment[0].x;
                return newPosition;
            }
        }


    }
}

module.exports = {
    isInside: isInside,
    getOnSegmentPoint: getOnSegmentPoint,
    getNewPoint: getNewPoint

};

