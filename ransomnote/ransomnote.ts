function canConstruct(ransomNote: string, magazine: string): boolean {
    if (magazine.length < ransomNote.length) {
        return false
    }

    const magKey: { [key: string]: number } = {}
	for (let char of magazine) {
		if (magKey[char]) {
			magKey[char]++
		} else {
			magKey[char] = 1
		}
    }

    for (let char of ransomNote) {
        if (typeof magKey[char] === 'undefined' || magKey[char] === 0) {
            return false
        } else {
            magKey[char]--
        }
    }

    return true
}
