// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@account-abstraction/contracts/core/EntryPoint.sol";
import "@account-abstraction/contracts/interfaces/IAccount.sol";

contract Account is IAccount{
    uint256 public count;
    address public owner;
    
    constructor(address _owner) {
        owner = _owner;
    }
    function validateUserOp(
        PackedUserOperation calldata ,
        bytes32 ,
        uint256
    ) external virtual override returns (uint256 validationData) {
        return 0;
    }
    
    function increment() public {
        count++;
    }

}

contract AccountFactory {
    event AccountCreated(address account, address owner);
    function createAccount(address owner) public returns (address) {
        Account account = new Account(owner);
        emit AccountCreated(address(account), owner);
        return address(account);
    }
}

