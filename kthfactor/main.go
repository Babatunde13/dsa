package kthfactor

func kthFactor(n int, k int) int {
    for index := 1; index <= n/2; index++ {
        if n % index == 0 {
            k--
        }

        if k == 0 {
            return index
        }
    }

    if k == 1 {
        return n
    }

    return -1
}
