pragma solidity >= 0.5.0 < 0.6.0;

import "Util.sol";
import "github.com/oraclize/ethereum-api/oraclizeAPI.sol";

contract ClaimEth is usingOraclize{
    
    Util util = new Util();
    mapping (string => settlementInfo) internal refundRecord;
    mapping(string => uint) internal uncollectETH;
    
    event LogOperationResult(uint result);
    
    struct settlementInfo {
        uint amount;
        uint index;
    }
    
    constructor() public {
        oraclize_setProof(proofType_TLSNotary | proofStorage_IPFS);
    }
    
    function __callback(bytes32 _myid, string memory _result, bytes memory _proof) public {
        require(msg.sender == oraclize_cbAddress());
        emit LogOperationResult(parseInt(_result));
        string memory ethAddress = util.substring(_result,0,19);
        string memory gcoinAddress = util.substring(_result,20,39);
        uint index = parseInt(util.substring(_result,40,40));
        uint amountDigitNum = parseInt(util.substring(_result,41,41));
        uint amount = parseInt(util.substring(_result,42,42+amountDigitNum));
        toUncollectETH(ethAddress,gcoinAddress,index,amount);
    }
    
    function toUncollectETH(string memory ethAddr, string memory gcoinAddr, uint index, uint amount) public{
        require(refundRecord[gcoinAddr].index!=index,"already take this fund");
        uncollectETH[ethAddr] = amount;
        refundRecord[ethAddr].index = index;
        refundRecord[ethAddr].amount = amount;
    }
    
    function collectEth() public {
        //contract transfer ETH to caller 
    }
    
    function refund(address a) public{
        string memory senderaddr = util.toString(msg.sender);
        oraclize_query("computation", ["Qmc8jmuT47cPWadF8ZhErGXj7J4VEp5H29knukCGirsN19", util.toString(a)]);
    }
    
}