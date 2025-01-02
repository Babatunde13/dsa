def number_of_steps(num):
    numOfSteps = 0
    while num > 0:
        if num % 2 == 0:
            num = num / 2
        else:
            num-=1
        

        numOfSteps+=1

    return numOfSteps
