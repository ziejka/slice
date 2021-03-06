module.exports = {
    line_intersect: function (x1, y1, x2, y2, x3, y3, x4, y4) {
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
    },

    isInside: function (point, vs) {
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
            inside = this.isOnSegmentPoint(point, vs);
        }

        return inside;
    },

    isOnSegmentPoint: function (point, polygon) {
        var segment, min, max, vertical, i;


        for (i = 0; i < polygon.length; i++) {
            segment = [polygon[i], polygon[i + 1] || polygon[0]];
            vertical = segment[0].x === segment[1].x;

            if (vertical) {
                if (point.x !== segment[0].x) {
                    continue;
                }

                max = Math.max(segment[0].y, segment[1].y);
                min = Math.min(segment[0].y, segment[1].y);

                if (point.y >= min && point.y <= max) {
                    return true;
                }
            } else {
                if (point.y !== segment[0].y) {
                    continue;
                }

                max = Math.max(segment[0].x, segment[1].x);
                min = Math.min(segment[0].x, segment[1].x);

                if (point.x >= min && point.x <= max) {
                    return true;
                }
            }
        }

        return false;
    },

    isOnPathSegmentPoint: function (point, polygon) {
        var segment, min, max, vertical, i;


        for (i = 0; i < polygon.length - 1; i++) {
            segment = [polygon[i], polygon[i + 1]];
            vertical = segment[0].x === segment[1].x;

            if (vertical) {
                if (point.x !== segment[0].x) {
                    continue;
                }

                max = Math.max(segment[0].y, segment[1].y);
                min = Math.min(segment[0].y, segment[1].y);

                if (point.y >= min && point.y <= max) {
                    return true;
                }
            } else {
                if (point.y !== segment[0].y) {
                    continue;
                }

                max = Math.max(segment[0].x, segment[1].x);
                min = Math.min(segment[0].x, segment[1].x);

                if (point.x >= min && point.x <= max) {
                    return true;
                }
            }
        }

        return false;
    },

    getNewPoint: function (newPosition, lastPosition, polygon, speed) {
        var segment, intersectionPoint,
            resutl = {
                position: newPosition,
                blockMove: false
            };
        for (var i = 0; i < polygon.length; i++) {
            segment = [polygon[i], polygon[i + 1] || polygon[0]];
            intersectionPoint = this.line_intersect(lastPosition.x, lastPosition.y, newPosition.x, newPosition.y,
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
    },

    isPointBetween: function (point, a, b) {
        var max, min,
            vertical = a.x === b.x;

        if (vertical) {
            if (point.x !== a.x) {
                return false;
            }
            max = Math.max(a.y, b.y);
            min = Math.min(a.y, b.y);

            if (point.y > min && point.y < max) {
                return true;
            }
        } else {
            if (point.y !== a.y) {
                return false;
            }

            max = Math.max(a.x, b.x);
            min = Math.min(a.x, b.x);

            if (point.x > min && point.x < max) {
                return true;
            }
        }
        return false;
    },

    getIndexAfter: function (point, path) {
        var a, b;
        for (var i = 0; i < path.length; i++) {
            a = path[i];
            b = path[i + 1] || path[0];

            if (JSON.stringify(point) === JSON.stringify(a)) {
                return i + 1;
            }

            if (JSON.stringify(point) === JSON.stringify(b)) {
                return i + 2;
            }

            if (this.isPointBetween(point, a, b)) {
                return i + 1;
            }
        }
    }
};

