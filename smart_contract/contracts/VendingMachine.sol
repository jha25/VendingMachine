// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VendingMachine {
    address public owner;
    mapping(address => uint256) public chipBalance;

    constructor() {
        owner = msg.sender;
        chipBalance[address(this)] = 100;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function getVendingMachineInventory() public view returns (uint256) {
        return chipBalance[address(this)];
    }

    function restock(uint256 _amount) public onlyOwner {
        chipBalance[address(this)] += _amount;
    }

    function purchase(uint256 _amount) public payable {
        require(
            msg.value >= _amount * 0.01 ether,
            "Insufficient fund to buy chips"
        );
        require(
            chipBalance[address(this)] >= _amount,
            "Can not meet amount required"
        );
        chipBalance[address(this)] -= _amount;
        chipBalance[msg.sender] += _amount;
    }
}
