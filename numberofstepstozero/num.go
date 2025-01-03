package numberofstepstozero

// https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/description/
func numberOfSteps(num int) int {
    numOfSteps := 0
    for num > 0 {
        if num % 2 == 0 {
            num = num / 2
        } else {
            num--
        }

		numOfSteps++
    }

    return numOfSteps
}

func numberOfStepsWithBitwise(num int) int {
    numOfSteps := 0
    for num > 0 {
        if num & 1 == 0 { // check if the last bit is 0, if it is, then the number is even and false is 0
            num >>= 1 // divide by 2 using bitwise
        } else {
            num--
        }

		numOfSteps++
    }

    return numOfSteps
}
