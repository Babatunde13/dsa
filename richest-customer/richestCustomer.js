function richestCustomerWealth1(accounts) {
	let highestWealth = 0
	for (const customerWealths of accounts) {
		let customerWealth = 0
		for (const wealth of customerWealths) {
			customerWealth += wealth
		}

		if (customerWealth >= highestWealth) {
			highestWealth = customerWealth
		}
	}

	return highestWealth
}
