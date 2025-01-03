package vowelstrings

import "strings"

func startsWithVowel(word string) bool {
    if strings.HasPrefix(word, "a") ||
        strings.HasPrefix(word, "e") ||
        strings.HasPrefix(word, "i") ||
        strings.HasPrefix(word, "o") ||
        strings.HasPrefix(word, "u") {
        return true
    }

    return false
}

func endsWithVowel(word string) bool {
    if strings.HasSuffix(word, "a") ||
        strings.HasSuffix(word, "e") ||
        strings.HasSuffix(word, "i") ||
        strings.HasSuffix(word, "o") ||
        strings.HasSuffix(word, "u") {
        return true
    }

    return false
}

func vowelStrings(words []string, queries [][]int) []int {
    n := make([]int, len(queries))
    prefixSum := make([]int, len(words))
    sum := 0
    for index, word := range words {
        if startsWithVowel(word) && endsWithVowel(word) {
            sum+=1
        }

        prefixSum[index] = sum
    }

    for index, query := range queries {
        start := query[0]
        stop := query[1]
        if start == 0 {
            n[index] = prefixSum[stop]
        } else {
            n[index] = prefixSum[stop] - prefixSum[start-1]
        }
    }

    return n
}
