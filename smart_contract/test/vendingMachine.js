/** @format */

const VendingMachine = artifacts.require("VendingMachine")

contract("VendingMachine", (accounts) => {
	before(async () => {
		vendingMachine = await VendingMachine.deployed()
	})

	it("Should have a starting inventory of 100", async () => {
		const initialBalance = await vendingMachine.getVendingMachineInventory()
		assert.equal(initialBalance, 100, "Initial balance should equal 100")
	})

	it("Should restock inventory", async () => {
		await vendingMachine.restock(100)
		const restockedBalance = await vendingMachine.getVendingMachineInventory()
		assert.equal(restockedBalance, 200, "Balance should be 200")
	})

	it("Should update balance after purchase", async () => {
		await vendingMachine.purchase(1, {
			from: accounts[0],
			value: web3.utils.toWei("0.02", "ether"),
		})
		const finalBalance = await vendingMachine.getVendingMachineInventory()
		assert.equal(finalBalance, 199, "Balance after purchase should be 199")
	})
})
