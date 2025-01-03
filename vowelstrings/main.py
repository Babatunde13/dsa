def starts_with_vowel(word: str):
    if (
        word.startswith("a") or
        word.startswith("e") or
        word.startswith("i") or
        word.startswith("o") or
        word.startswith("u")
    ):
        return True
    
    return False

def ends_with_vowel(word: str):
    if (
        word.endswith("a") or
        word.endswith("e") or
        word.endswith("i") or
        word.endswith("o") or
        word.endswith("u")
    ):
        return True
    
    return False

def vowel_strings(words: list[str], queries: list[list[int]]) -> list[int]:
    n = [0] * len(queries)
    prefixSum = [0] * len(words)
    sum = 0
    for index, word in enumerate(words):
        if starts_with_vowel(word) and ends_with_vowel(word):
            sum+=1

        prefixSum[index] = sum

    for index, query in enumerate(queries):
        start = query[0]
        stop = query[1]
        if start == 0:
            n[index] = prefixSum[stop]
        else:
            n[index] = prefixSum[stop] - prefixSum[start-1]

    return n
