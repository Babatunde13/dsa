function startsWithVowel1(str: string): boolean {
    if (str.startsWith('a') || str.startsWith('e') || str.startsWith('i') || str.startsWith('o') || str.startsWith('u')) {
        return true;
    }
  
    return false;
}
  
function endsWithVowel1(str: string): boolean {
    if (str.endsWith('a') || str.endsWith('e') || str.endsWith('i') || str.endsWith('o') || str.endsWith('u')) {
        return true;
    }
  
    return false;
  }
  
function vowelStrings1(words: string[], queries: number[][]) {
    const n: number[] = []
    const prefixSum: number[] = []
    let sum = 0
    for (const word of words) {
        if (startsWithVowel(word) && endsWithVowel(word)) {
            sum++
        }
        n.push(sum)
    }
  
    for (const query of queries) {
        const start = query[0]
        const end = query[1]
        if (start == 0) {
            n.push(prefixSum[end])
        } else {
            n.push(prefixSum[end] - prefixSum[start - 1])
        }
    }
  
    return n
}
