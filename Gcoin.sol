pragma solidity ^0.4.21;

contract ERC20Interface {
  string public name;
  string public symbol;
  uint8 public  decimals;
  uint public totalSupply;


  function transfer(address _to, uint256 _value) returns (bool success);

  event Transfer(address indexed _from, address indexed _to, uint256 _value);

}

contract ERC20 is ERC20Interface {

    mapping (address => uint256) public balanceOf;

    constructor() public {
        totalSupply = 100000000000;
        name = "Gcoin";
        symbol = "Gcoin";
        decimals = 0;
        balanceOf[msg.sender] = totalSupply;
    }

  function balanceOf(address _owner) view returns (uint256 balance) {
      return balanceOf[_owner];
  }

    function transfer(address _to, uint _value) public returns (bool success) {
        require(_to != address(0));
        require(_value <= balanceOf[msg.sender]);
        require(balanceOf[_to] + _value >= balanceOf[_to]);

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

  
}