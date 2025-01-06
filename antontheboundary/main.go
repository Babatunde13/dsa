package antontheboundary

// https://leetcode.com/problems/ant-on-the-boundary/description/?envType=problem-list-v2&envId=prefix-sum

func returnToBoundaryCount(nums []int) int {
    count := 0
    totalSum := 0
    for _, num := range nums {
        totalSum += num
        if totalSum == 0 {
            count++
        }
    }

    return count
}

func returnToBoundaryCountPrefixSum(nums []int) int {
	count := 0
	/*
		nums contains non-zero integers which means the
		first element is not 0 and it's prefix sum will never be 0
		For this reason we don't need the check for the first element
	*/
	for index := 1; index < len(nums); index++ {
		nums[index] = nums[index-1] + nums[index]
		if nums[index] == 0 {
			count++
		}
	}

	return count
}
