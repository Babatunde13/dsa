function startsWithVowel(str) {
    if (str.startsWith('a') || str.startsWith('e') || str.startsWith('i') || str.startsWith('o') || str.startsWith('u')) {
        return true;
    }

    return false;
}

function endsWithVowel(str) {
    if (str.endsWith('a') || str.endsWith('e') || str.endsWith('i') || str.endsWith('o') || str.endsWith('u')) {
        return true;
    }

    return false;
}

function vowelStrings(words, queries) {
   const n = []
   const prefixSum = []
   let sum = 0
   for (const word of words) {
        if (startsWithVowel(word) && endsWithVowel(word)) {
            sum++
        }
        n.push(sum)
   }

    for (const query of queries) {
        start = query[0]
        end = query[1]
        if (start == 0) {
            n.push(prefixSum[end])
        } else {
            n.push(prefixSum[end] - prefixSum[start - 1])
        }
    }

    return n
}