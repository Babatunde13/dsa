def runnint_sum(nums: list[int]) -> list[int]:
    result = []
    for i in range(len(nums)):
        if i == 0:
            result.append(nums[i])
        else:
            result.append(result[i-1] + nums[i])
        
    return result

if __name__ == "__main__":
    nums = [1, 2, 3, 4]
    print(runnint_sum(nums))