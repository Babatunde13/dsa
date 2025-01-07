package twosum

// https://leetcode.com/problems/two-sum/description/

func twoSum(nums []int, target int) []int {
	hashMap := make(map[int]int)
	for i, num := range nums {
		diff := target - num
		if _, ok := hashMap[diff]; ok {
			return []int{hashMap[diff], i}
		}

		hashMap[num] = i
	}

	return []int{}
}
