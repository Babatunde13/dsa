def can_construct1(ransomNote, magazine):
    if len(magazine) < len(ransomNote):
        return False

    magKey = {}
    for char in magazine:
        if magKey.get(char):
            magKey[char]+=1
        else:
            magKey[char] = 1

    for char in ransomNote:
        if not magKey.get(char) or magKey[char] == 0:
            return False
        else:
            magKey[char]-=1

    return True
