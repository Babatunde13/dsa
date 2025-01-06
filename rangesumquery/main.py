class NumArray:
    def __init__(self, nums: list[int]):
        self.prefix_sum = nums
        for index in range(1, len(nums)):
            self.prefix_sum[index] = self.prefix_sum[index-1] + self.prefix_sum[index]

    def sumRange(self, left: int, right: int) -> int:
        left_sum = 0
        right_sum = self.prefix_sum[right]
        if left != 0:
            left_sum = self.prefix_sum[left - 1]
        return right_sum - left_sum
        


# Your NumArray object will be instantiated and called as such:
# obj = NumArray(nums)
# param_1 = obj.sumRange(left,right)