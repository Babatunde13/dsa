package richestcustomer

func richestCustomerWealth(accounts [][]int) int {
	highestWealth := 0
	for _, customerWealths := range accounts {
		customerWealth := 0
		for _, wealth := range customerWealths {
			customerWealth += wealth
		}

		if customerWealth >= highestWealth {
			highestWealth = customerWealth
		}
	}

	return highestWealth
}