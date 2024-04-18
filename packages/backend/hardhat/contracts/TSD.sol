// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

/**
 
@title Storage
@dev Store & retrieve value in a variable
@custom:dev-run-script ./scripts/deploy_with_ethers.ts
*/
contract document {

    string public name;
    string public symbol;
    string public projectDescription;






    constructor(string memory _name, string memory _symbol,string memory _projectDescription){
        name = _name;
        symbol = _symbol;
        projectDescription = _projectDescription;
    }

    function returnName() public view returns (string memory){
        return name;
    }

    function returnSymbol() public view returns (string memory){
        return symbol;
    }
}
contract factory {
    address[] public deployeddocument;

    function createdocument( string memory _name, string memory _symbol,string memory _projectDescription) public {
        address newdocument = address(new document(_name,_symbol,_projectDescription));
        deployeddocument.push(newdocument);
    }

    

}