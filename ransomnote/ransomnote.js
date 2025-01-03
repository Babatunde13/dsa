function canConstruct1(ransomNote, magazine) {
    if (magazine.length < ransomNote.length) {
        return false
    }

    const magKey = {}
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
