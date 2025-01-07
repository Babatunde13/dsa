class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        hashmap = {}
        for i, num in enumerate(numbers):
            diff = target - num
            if diff in hashmap:
                return [hashmap[diff], i+1]
            
            hashmap[num] = i + 1
        
        return []