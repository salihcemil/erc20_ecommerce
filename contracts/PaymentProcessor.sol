pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PaymentProcessor {
    address public admin;
    IERC20 public usdt;

    event PaymentDone(
        address payer,
        uint256 amount,
        string paymentId,
        uint256 date
    );

    constructor(address adminAddress, address usdtAddress) {
        admin = adminAddress;
        usdt = IERC20(usdtAddress);
    }

    function pay(uint256 amount, string memory paymentId) external {
        usdt.transferFrom(msg.sender, admin, amount);
        emit PaymentDone(msg.sender, amount, paymentId, block.timestamp);
    }
}
