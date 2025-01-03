def ways_to_split_array(nums):
    count = 0
    leftSum = 0
    rightSum = 0

    for a in nums:
        rightSum += a

    for b in nums:
        leftSum += b
        rightSum -= b
        if leftSum > rightSum:
            count+=1

    return count
