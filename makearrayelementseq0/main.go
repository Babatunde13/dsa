package makearrayelementseq0

func countValidSelectionsRecursion(nums []int, curr int, direction string) int {
    if 0 > curr || curr > len(nums) - 1 {
        return curr
    }

    if nums[curr] == 0 {
        if direction == "right" {
            curr++
        } else {
            curr--
        }
    }

    if nums[curr] > 0 {
        nums[curr]--
        if direction == "right" {
            direction = "left"
            curr--
        } else {
            direction = "right"
            curr++
        }
    }

    return countValidSelectionsRecursion(nums, curr, direction)
}

func countValidSelections(nums []int) int {
    curr := -1
    for index, num := range nums {
        if num == 0 {
            curr = index
            break
        }
    }

    return countValidSelectionsRecursion(nums, curr, "right")
}
