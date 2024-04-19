// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

/**
 
@title Storage
@dev Store & retrieve value in a variable
@custom:dev-run-script ./scripts/deploy_with_ethers.ts
*/
contract TSD {
    string public userName;
    string public projectName;
    string public projectDescription;
    string public dataURI;

    constructor(
        string memory _name,
        string memory _projectName,
        string memory _projectDescription,
        string memory _dataURI
    ) {
        userName = _name;
        projectName = _projectName;
        projectDescription = _projectDescription;
        dataURI = _dataURI;
    }
}
