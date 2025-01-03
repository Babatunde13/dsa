package waystosplitarray

func waysToSplitArray(nums []int) int {
    count := 0
	leftSum := 0
	rightSum := 0
    for a := 0; a < len(nums); a++ {
        rightSum += nums[a]
    }

    for i := 0; i < len(nums)-1; i++ {
		leftSum += nums[i]
		rightSum -= nums[i]
        if leftSum > rightSum {
            count++
        }
    }

    return count
}
