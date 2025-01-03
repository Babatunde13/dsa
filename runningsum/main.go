package main

// https://leetcode.com/problems/running-sum-of-1d-array/description/

import "fmt"

func runningSum(nums []int) []int {
	result  := make([]int, len(nums))

	for index := 1; index < len(nums); index++ {
		nums[index] = nums[index-1] + nums[index]
	}

	return result
}

func main() {
	fmt.Println("Hello, playground")
	fmt.Println(runningSum([]int{1,2,3,4}))
	fmt.Println(runningSum([]int{1,1,1,1,1}))
}