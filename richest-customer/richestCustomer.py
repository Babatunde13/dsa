def maximum_wealth(accounts):
	highest_wealth = 0
	for customer_wealths in accounts:
		customer_wealth = 0
		for wealth in customer_wealths:
			customer_wealth += wealth

		if customer_wealth >= highest_wealth:
			highest_wealth = customer_wealth

	return highest_wealth

if __name__ == "__main__":
	print(maximum_wealth([[1, 2, 3], [3, 2, 1]])) # 6