function nearestValidPoint1(x, y, points) {
    let minDistance = Infinity
    let minDistanceIdx = -1
    for (let i = 0; i < points.length; i++) {
        if (isPointValid(x, y, points[i])) {
            const distance = manhattanDistance(x, y, points[i])
            if (distance < minDistance) {
                minDistance = distance
                minDistanceIdx = i
            }
        }
    }

    return minDistanceIdx
};

function isPointValid1(x, y, point) {
    return x == point[0] || y == point[1]
};

function manhattanDistance1(x, y, point) {
    return Math.abs(x - point[0]) + Math.abs(y - point[1])
};
