package twosum2

// https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/

func twoSum(numbers []int, target int) []int {
	hashMap := make(map[int]int)
	for i, num := range numbers {
		diff := target - num
		if _, ok := hashMap[diff]; ok {
			return []int{hashMap[diff], i+1}
		}

		hashMap[num] = i + 1
	}

	return []int{}
}
