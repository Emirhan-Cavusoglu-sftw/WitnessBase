// SPDX-License-Identifier: MIT
import {ISP} from "@ethsign/sign-protocol-evm/src/interfaces/ISP.sol";
import {Attestation} from "@ethsign/sign-protocol-evm/src/models/Attestation.sol";
import {DataLocation} from "@ethsign/sign-protocol-evm/src/models/DataLocation.sol";
pragma solidity ^0.8.24;


contract TSD {
    string public userName;
    string public projectName;
    string public projectDescription;
    string public dataURI;
    // ISP public spInstance=ISP(0x4e4af2a21ebf62850fD99Eb6253E1eFBb56098cD);
    bool public isAttested;

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
        // attestTSD();
    }

    //  function attestTSD()  public returns (uint64){
    //     require(isAttested == false, "Already Attested");
    //     Attestation memory a = Attestation({
    //         schemaId: 3,
    //         linkedAttestationId: 0,
    //         attestTimestamp: 0,
    //         revokeTimestamp: 0,
    //         attester: address(this),
    //         validUntil: 0,
    //         dataLocation: DataLocation.ONCHAIN,
    //         revoked: false,
    //         recipients: new bytes[](0),
    //         data: abi.encode("exp") 
    //     });
       
       

    //    uint64 attestationId =  spInstance.attest(a, "bok", "0x", "0x");
    //      isAttested = true;
    //    return attestationId;
    // }
}

