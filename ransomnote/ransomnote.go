package ransomnote

func canConstruct(ransomNote string, magazine string) bool {
	if len(magazine) < len(ransomNote) {
        return false
	}

    magKey := map[byte]int{}
	for index := 0; index < len(magazine); index++ {
		if _, ok := magKey[magazine[index]]; ok {
			magKey[magazine[index]]++
		} else {
			magKey[magazine[index]] = 1
		}
    }

    for index := 0; index < len(ransomNote); index++ {
        if val, exists := magKey[ransomNote[index]]; !exists || val == 0 {
            return false
        } else {
            magKey[ransomNote[index]]--
        }
    }

    return true
}
