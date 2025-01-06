class NumArray1 {
    prefixSum
    constructor(nums) {
        for (let index = 1; index < nums.length; index++) {
            nums[index] = nums[index - 1] + nums[index]
        }

        this.prefixSum = nums
    }

    sumRange(left, right) {
        return this.prefixSum[right] - (left === 0 ? 0 : this.prefixSum[left - 1])
    }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */