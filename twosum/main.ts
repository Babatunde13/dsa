function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>()
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i]
        const diffIdx = map.get(diff)
        if (diffIdx !== undefined) {
            return [diffIdx, i]
        }

        map[nums[i]] = i
    }

    return []
}
