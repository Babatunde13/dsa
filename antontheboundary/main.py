class Solution:
    def returnToBoundaryCount(self, nums: list[int]) -> int:
        count = 0
        total_sum = 0
        for num in nums:
            total_sum += num
            if total_sum == 0:
                count += 1
            
        return count
    
    def return_to_boundary_count_prefix_sum(self, nums: list[int]) -> int:
        count = 0
        for i in range(1, len(nums)):
            nums[i] += nums[i-1]
            if nums[i] == 0:
                count += 1
        
        return count