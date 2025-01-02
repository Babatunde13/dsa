package main

import "fmt"

func runningSum(nums []int) []int {
	result  := make([]int, len(nums))

	for index, j := range nums {
		if index == 0 {
			result = append(result, j)
		} else {
			result = append(result, result[index-1] + j)
		}
	}

	return result
}

func main() {
	fmt.Println("Hello, playground")
	fmt.Println(runningSum([]int{1,2,3,4}))
	fmt.Println(runningSum([]int{1,1,1,1,1}))
}