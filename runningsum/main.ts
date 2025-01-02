function runningSum1(nums: number[]): number[] {
    const result: number[] = []
    for (let i = 0; i < nums.length; i++) {
        if (i == 0) {
            result.push(nums[i])
        } else {
            result.push(result[i - 1] + nums[i])
        }
    }

    return nums
}


function main1() {
    console.log(runningSum1([1, 2, 3, 4]))
}
