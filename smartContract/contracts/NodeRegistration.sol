// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.4;

contract NodeRegistrationInterface {
    address public admin;
}

contract NodeRegistration is NodeRegistrationInterface{

    struct OtpInfo {
        bytes32 otpHashValue;
        uint256 otpValidation;
        uint activate;
    }

    mapping(address => OtpInfo) internal otpOf;
    bytes32 public hashedAdminPW = 0x2e6285b5dde400bb8e8306ceffb0f9ade888e91d2b4d3aa8b23981e9c90c5eaa;

    constructor() {
        admin = msg.sender;
    }

    function verifyOtp(string memory otp) public {
        if(otpOf[msg.sender].activate == 0){
            if(keccak256(bytes(otp)) == otpOf[msg.sender].otpHashValue){
                otpOf[msg.sender].activate = 1;
            }
        }
    }

    function settingOtpHashValue(address applicantAddress,bytes32 otpHashValue) public {
        require(msg.sender == admin);
        OtpInfo memory otpInfo = OtpInfo(otpHashValue,block.timestamp+(3 * 1 days),0);
        otpOf[applicantAddress] = otpInfo;
    }

    function addingPeer(address applicantAddress) public {
        require(msg.sender==admin);
        if(otpOf[applicantAddress].activate == 1)
            otpOf[applicantAddress].activate = 2;
    }

    function setHashedAdminPW(bytes32 hashedpw) public {
        require(msg.sender == admin);
        hashedAdminPW = hashedpw;
    }

    function deleteMappingElement(address a) public {
        require(msg.sender == admin);
        delete otpOf[a];
    }

    function addressNetworkState(address a) public view returns (uint) {
        return otpOf[a].activate;
    }

    function addressOtphashedValue(address a) public view returns(bytes32){
        return otpOf[a].otpHashValue;
    }
}
