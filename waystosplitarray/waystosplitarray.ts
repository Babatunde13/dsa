function waysToSplitArray(nums: number[]): number {
    let count = 0
    let leftSum = 0
	let rightSum = 0

    for(let a = 0; a < nums.length-1; a++) {
        rightSum += nums[a]
    }

    for (let i = 0; i < nums.length-1; i++) {
        leftSum += nums[i]
        rightSum -= nums[i]
        if (leftSum > rightSum) {
            count++
        }
    }

    return count
}
