package nearestpoint

// https://leetcode.com/problems/find-nearest-point-that-has-the-same-x-or-y-coordinate/description/

import "math"

func pointIsValid(x int, y int, point []int) bool {
    return x == point[0] || y == point[1]
}

func manhattanDistance(x int, y int, point []int) float64 {
    return math.Abs(float64(x) - float64(point[0])) + math.Abs(float64(y) - float64(point[1]))
}

func nearestValidPoint(x int, y int, points [][]int) int {
    shortestDistanceIndex := -1
    shortestDistance := math.Inf(1)
    for index, point := range points {
        if pointIsValid(x, y, point) {
            distance := manhattanDistance(x, y, point)
            if distance < shortestDistance {
                shortestDistanceIndex = index
                shortestDistance = distance
            }
        }
    }

    return shortestDistanceIndex
}
