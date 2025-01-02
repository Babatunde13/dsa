function numberOfSteps1(num) {
    let numOfSteps = 0
    while (num > 0) {
        if (num % 2 === 0) {
            num = num / 2
        } else {
            num--
        }

        numOfSteps++
    }

    return numOfSteps
}
