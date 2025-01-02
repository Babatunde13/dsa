function runningSum(nums) {
    const result = []
    for (let i = 0; i < nums.length; i++) {
        if (i == 0) {
            result.push(nums[i])
        } else {
            result.push(result[i - 1] + nums[i])
        }
    }

    return nums
}


function main() {
    console.log(runningSum([1, 2, 3, 4]))
}
