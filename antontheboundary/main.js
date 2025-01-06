function returnToBoundaryCount(nums) {
    let totalSum = 0
    let count = 0
    for (const num of nums) {
        totalSum += num
        if (totalSum === 0) {
            count++
        }
    }

    return count
};
