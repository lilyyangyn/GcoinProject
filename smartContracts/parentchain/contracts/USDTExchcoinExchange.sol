/**
 *Submitted for verification at Etherscan.io on 2021-01-03
*/

pragma solidity ^0.7.4;

interface ERC20 {
    
  function totalSupply() virtual external view returns (uint256);
  function balanceOf(address _owner) virtual external view returns (uint256 balance);
  function transfer(address _to, uint256 _value) virtual external returns (bool success);
  function transferFrom(address _from, address _to, uint256 _value) virtual external returns (bool success);
  function approve(address _spender, uint256 _value) virtual external returns (bool success);
  function allowance(address _owner, address _spender) virtual external view returns (uint256 remaining);

  event Transfer(address indexed _from, address indexed _to, uint256 _value);
  event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}

contract USDTExchcoinExchange {
    
    ERC20 usdt;
    ERC20 exchcoin;
    address public USDT_Contract;
    address public Exchcoin_Contract;
    mapping(address => uint256) public USDT_Ledger;
    mapping(address => uint256) public Exchcoin_Ledger;
    uint8 public pltf_fee_rate = 15;
    address public pltf_owner;
    
    constructor(address _u, address _e, address _o) {
        USDT_Contract = _u;
        Exchcoin_Contract = _e;
        usdt = ERC20(USDT_Contract);
        exchcoin = ERC20(Exchcoin_Contract);
        pltf_owner = _o;
    }
    
    function exchcoinToUSDT (uint256 _v) public {
        require(exchcoin.allowance(msg.sender, address(this)) >= _v, "allowance not enough");
        require(exchcoin.balanceOf(msg.sender) >= _v, "Insufficient exchcoin balance of user");
        require (USDT_Ledger[msg.sender] == 0, "There is unreceived balance in the USDT ledger");
        require (usdt.balanceOf(address(this)) >= _v, "Contract don't have enough USDT to pay");
        bool success = exchcoin.transferFrom(msg.sender, address(this), _v);
        require(success == true, "failed to transfer USDT from user account to contract");
        USDT_Ledger[msg.sender] = _v;
        exchcoinToUSDTCoinDeliver();
    }
    
    function exchcoinToUSDTCoinDeliver() public {
        uint256 _v = USDT_Ledger[msg.sender];
        require(_v > 0, "Please send exchcoin to this smart constract first.");
        uint256 pltf_fee = 0;
        if(msg.sender != pltf_owner){
            pltf_fee = _v * pltf_fee_rate / 100;
        }
        bool success = usdt.transfer(msg.sender, _v - pltf_fee);
        require (success == true, "USDT deliver failed, try to call CoinDeliver function again");
        USDT_Ledger[pltf_owner] = USDT_Ledger[pltf_owner] + pltf_fee;
        USDT_Ledger[msg.sender] = 0;
    }
    
    function USDTToExchcoin (uint256 _v) public {
        require( usdt.allowance(msg.sender, address(this)) >= _v, "allowance not enough");
        require(usdt.balanceOf(msg.sender) >= _v, "Insufficient USDT balance of user");
        require(exchcoin.balanceOf(address(this)) >= _v, "Contract don't have enough Exchcoin saving");
        bool success = usdt.transferFrom(msg.sender, address(this), _v);
        require(success = true, "failed to transfer USDT from user account to contract");
        Exchcoin_Ledger[msg.sender] = _v;
        USDTtoExchcoinCoinDeliver();
    }
    
    function USDTtoExchcoinCoinDeliver() public{
        uint256 _v = Exchcoin_Ledger[msg.sender];
        require(_v > 0, "Please send USDT to this smart constract first.");
        bool success = exchcoin.transfer(msg.sender, _v);
        require (success == true, "Exchcoin deliver failed, try to call CoinDeliver function again");
        Exchcoin_Ledger[msg.sender] = 0;
    }
    
    function transferPltfOwnership (address _a) public {
        require(msg.sender == pltf_owner, "Platform Owner required");
        pltf_owner = _a;
    }
    
    function checkUSDTBalance() public view returns (uint256) {
        return usdt.balanceOf(msg.sender);
    }

    function checkExchcoinBalance() public view returns (uint256) {
        return exchcoin.balanceOf(msg.sender);
    }

    function checkSCUSDTLeger() public view returns (uint256) {
        return USDT_Ledger[msg.sender];
    }

    function checkSCExchcoinLeger() public view returns (uint256) {
        return Exchcoin_Ledger[msg.sender];
    }
    
}