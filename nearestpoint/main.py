import math

class Solution:
    def nearestValidPoint(self, x: int, y: int, points: list[list[int]]) -> int:
        min_distance = math.inf
        min_distance_index = -1
        for idx in range(len(points)):
            point = points[idx]
            if self.is_point_valid(x, y, point):
                distance = self.manhattan_distance(x, y, point)
                if distance < min_distance:
                    min_distance = distance
                    min_distance_index = idx

        return min_distance_index

    def is_point_valid(self, x: int, y: int, point: list[int]) -> bool:
        return x == point[0] or y == point[1]
    
    def manhattan_distance(self, x: int, y: int, point: list[int]) -> int:
        return abs(x - point[0]) + abs(y - point[1])
