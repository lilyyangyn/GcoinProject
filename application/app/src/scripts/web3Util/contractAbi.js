const contractAbi = {
    USDTFaucetAbi: [{
        "inputs": [{
            "internalType": "address",
            "name": "USDT_Contract_Address",
            "type": "address"
        }, {"internalType": "address", "name": "provider", "type": "address"}],
        "stateMutability": "nonpayable",
        "type": "constructor"
    }, {
        "inputs": [],
        "name": "USDT_Contract",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "_a", "type": "address"}],
        "name": "getUSDT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }],
    USDTAbi: [{
        "inputs": [{"internalType": "uint8", "name": "_decimals", "type": "uint8"}, {
            "internalType": "uint256",
            "name": "_totalSupply",
            "type": "uint256"
        }], "stateMutability": "nonpayable", "type": "constructor"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "_owner", "type": "address"}, {
            "indexed": true,
            "internalType": "address",
            "name": "_spender",
            "type": "address"
        }, {"indexed": false, "internalType": "uint256", "name": "_value", "type": "uint256"}],
        "name": "Approval",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "_from", "type": "address"}, {
            "indexed": true,
            "internalType": "address",
            "name": "_to",
            "type": "address"
        }, {"indexed": false, "internalType": "uint256", "name": "_value", "type": "uint256"}],
        "name": "Transfer",
        "type": "event"
    }, {
        "inputs": [{"internalType": "address", "name": "_owner", "type": "address"}, {
            "internalType": "address",
            "name": "_spender",
            "type": "address"
        }],
        "name": "allowance",
        "outputs": [{"internalType": "uint256", "name": "remaining", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "_spender", "type": "address"}, {
            "internalType": "uint256",
            "name": "_value",
            "type": "uint256"
        }],
        "name": "approve",
        "outputs": [{"internalType": "bool", "name": "success", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "_owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"internalType": "uint256", "name": "balance", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "decimals",
        "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "name",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "symbol",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "_to", "type": "address"}, {
            "internalType": "uint256",
            "name": "_value",
            "type": "uint256"
        }],
        "name": "transfer",
        "outputs": [{"internalType": "bool", "name": "success", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "_from", "type": "address"}, {
            "internalType": "address",
            "name": "_to",
            "type": "address"
        }, {"internalType": "uint256", "name": "_value", "type": "uint256"}],
        "name": "transferFrom",
        "outputs": [{"internalType": "bool", "name": "success", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    }],
    bridgeTokenAbi: [{
        "constant": true,
        "inputs": [],
        "name": "mintingFinished",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [{"name": "", "type": "string"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}],
        "name": "approve",
        "outputs": [{"name": "result", "type": "bool"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_bridgeContract", "type": "address"}],
        "name": "setBridgeContract",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_sender", "type": "address"}, {
            "name": "_recipient",
            "type": "address"
        }, {"name": "_amount", "type": "uint256"}],
        "name": "transferFrom",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "PERMIT_TYPEHASH",
        "outputs": [{"name": "", "type": "bytes32"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{"name": "", "type": "uint8"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "DOMAIN_SEPARATOR",
        "outputs": [{"name": "", "type": "bytes32"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_to", "type": "address"}, {"name": "_addedValue", "type": "uint256"}],
        "name": "increaseAllowance",
        "outputs": [{"name": "result", "type": "bool"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}, {
            "name": "_data",
            "type": "bytes"
        }],
        "name": "transferAndCall",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_to", "type": "address"}, {"name": "_amount", "type": "uint256"}],
        "name": "mint",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_value", "type": "uint256"}],
        "name": "burn",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "version",
        "outputs": [{"name": "", "type": "string"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_spender", "type": "address"}, {"name": "_subtractedValue", "type": "uint256"}],
        "name": "decreaseApproval",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_token", "type": "address"}, {"name": "_to", "type": "address"}],
        "name": "claimTokens",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_address", "type": "address"}],
        "name": "isBridge",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "finishMinting",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "", "type": "address"}],
        "name": "nonces",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "getTokenInterfacesVersion",
        "outputs": [{"name": "major", "type": "uint64"}, {"name": "minor", "type": "uint64"}, {
            "name": "patch",
            "type": "uint64"
        }],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_holder", "type": "address"}, {"name": "_spender", "type": "address"}, {
            "name": "_nonce",
            "type": "uint256"
        }, {"name": "_expiry", "type": "uint256"}, {"name": "_allowed", "type": "bool"}, {
            "name": "_v",
            "type": "uint8"
        }, {"name": "_r", "type": "bytes32"}, {"name": "_s", "type": "bytes32"}],
        "name": "permit",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [{"name": "", "type": "string"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "spender", "type": "address"}, {"name": "subtractedValue", "type": "uint256"}],
        "name": "decreaseAllowance",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}],
        "name": "transfer",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_to", "type": "address"}, {"name": "_amount", "type": "uint256"}],
        "name": "push",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_from", "type": "address"}, {"name": "_to", "type": "address"}, {
            "name": "_amount",
            "type": "uint256"
        }],
        "name": "move",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "bridgeContract",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_spender", "type": "address"}, {"name": "_addedValue", "type": "uint256"}],
        "name": "increaseApproval",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_owner", "type": "address"}, {"name": "_spender", "type": "address"}],
        "name": "allowance",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_from", "type": "address"}, {"name": "_amount", "type": "uint256"}],
        "name": "pull",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_newOwner", "type": "address"}],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "", "type": "address"}, {"name": "", "type": "address"}],
        "name": "expirations",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"name": "_name", "type": "string"}, {"name": "_symbol", "type": "string"}, {
            "name": "_decimals",
            "type": "uint8"
        }, {"name": "_chainId", "type": "uint256"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "name": "to", "type": "address"}, {
            "indexed": false,
            "name": "amount",
            "type": "uint256"
        }],
        "name": "Mint",
        "type": "event"
    }, {"anonymous": false, "inputs": [], "name": "MintFinished", "type": "event"}, {
        "anonymous": false,
        "inputs": [{"indexed": true, "name": "previousOwner", "type": "address"}],
        "name": "OwnershipRenounced",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "name": "previousOwner", "type": "address"}, {
            "indexed": true,
            "name": "newOwner",
            "type": "address"
        }],
        "name": "OwnershipTransferred",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "name": "burner", "type": "address"}, {
            "indexed": false,
            "name": "value",
            "type": "uint256"
        }],
        "name": "Burn",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "name": "from", "type": "address"}, {
            "indexed": true,
            "name": "to",
            "type": "address"
        }, {"indexed": false, "name": "value", "type": "uint256"}, {"indexed": false, "name": "data", "type": "bytes"}],
        "name": "Transfer",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "name": "owner", "type": "address"}, {
            "indexed": true,
            "name": "spender",
            "type": "address"
        }, {"indexed": false, "name": "value", "type": "uint256"}],
        "name": "Approval",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "name": "from", "type": "address"}, {
            "indexed": true,
            "name": "to",
            "type": "address"
        }, {"indexed": false, "name": "value", "type": "uint256"}],
        "name": "Transfer",
        "type": "event"
    }],
    USDTExchcoinExchangeAbi: [{
        "inputs": [{
            "internalType": "address",
            "name": "_u",
            "type": "address"
        }, {"internalType": "address", "name": "_e", "type": "address"}, {
            "internalType": "address",
            "name": "_o",
            "type": "address"
        }], "stateMutability": "nonpayable", "type": "constructor"
    }, {
        "inputs": [],
        "name": "Exchcoin_Contract",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "", "type": "address"}],
        "name": "Exchcoin_Ledger",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "uint256", "name": "_v", "type": "uint256"}],
        "name": "USDTToExchcoin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "USDT_Contract",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "", "type": "address"}],
        "name": "USDT_Ledger",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "USDTtoExchcoinCoinDeliver",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "checkExchcoinBalance",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "checkSCExchcoinLeger",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "checkSCUSDTLeger",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "checkUSDTBalance",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "uint256", "name": "_v", "type": "uint256"}],
        "name": "exchcoinToUSDT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "exchcoinToUSDTCoinDeliver",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "pltf_fee_rate",
        "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "pltf_owner",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "_a", "type": "address"}],
        "name": "transferPltfOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }],
    GcoinAbi: [{
        "inputs": [{"internalType": "uint8", "name": "_decimals", "type": "uint8"}, {
            "internalType": "uint256",
            "name": "_totalSupply",
            "type": "uint256"
        }], "stateMutability": "nonpayable", "type": "constructor"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "_owner", "type": "address"}, {
            "indexed": true,
            "internalType": "address",
            "name": "_spender",
            "type": "address"
        }, {"indexed": false, "internalType": "uint256", "name": "_value", "type": "uint256"}],
        "name": "Approval",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "_from", "type": "address"}, {
            "indexed": true,
            "internalType": "address",
            "name": "_to",
            "type": "address"
        }, {"indexed": false, "internalType": "uint256", "name": "_value", "type": "uint256"}],
        "name": "Transfer",
        "type": "event"
    }, {
        "inputs": [{"internalType": "address", "name": "_owner", "type": "address"}, {
            "internalType": "address",
            "name": "_spender",
            "type": "address"
        }],
        "name": "allowance",
        "outputs": [{"internalType": "uint256", "name": "remaining", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "_spender", "type": "address"}, {
            "internalType": "uint256",
            "name": "_value",
            "type": "uint256"
        }],
        "name": "approve",
        "outputs": [{"internalType": "bool", "name": "success", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "_owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"internalType": "uint256", "name": "balance", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "decimals",
        "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "name",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "symbol",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "_to", "type": "address"}, {
            "internalType": "uint256",
            "name": "_value",
            "type": "uint256"
        }],
        "name": "transfer",
        "outputs": [{"internalType": "bool", "name": "success", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "_from", "type": "address"}, {
            "internalType": "address",
            "name": "_to",
            "type": "address"
        }, {"internalType": "uint256", "name": "_value", "type": "uint256"}],
        "name": "transferFrom",
        "outputs": [{"internalType": "bool", "name": "success", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    }],
    GcoinExchcoinExchangeAbi: [{
        "inputs": [{
            "internalType": "address",
            "name": "_g",
            "type": "address"
        }, {"internalType": "address", "name": "_e", "type": "address"}, {
            "internalType": "address",
            "name": "_o",
            "type": "address"
        }], "stateMutability": "nonpayable", "type": "constructor"
    }, {
        "inputs": [],
        "name": "Exchcoin_Contract",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "", "type": "address"}],
        "name": "Exchcoin_Ledger",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "uint256", "name": "_v", "type": "uint256"}],
        "name": "GcoinToExchcoin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "Gcoin_Contract",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "", "type": "address"}],
        "name": "Gcoin_Ledger",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "GcointoExchcoinCoinDeliver",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "checkExchcoinBalance",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "checkGcoinBalance",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "checkSCExchcoinLedger",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "checkSCGcoinLedger",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "", "type": "address"}],
        "name": "companyList",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "uint256", "name": "_v", "type": "uint256"}],
        "name": "exchcoinToGcoin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "exchcoinToGcoinCoinDeliver",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "pltf_owner",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "_a", "type": "address"}, {
            "internalType": "bool",
            "name": "_b",
            "type": "bool"
        }], "name": "registerCompany", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    }],
    AMBBridgeHelperAbi: [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_homeBridge","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IHomeBridge"}],"name":"AMBcontract","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"clean","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes","name":"","internalType":"bytes"}],"name":"getSignatures","inputs":[{"type":"bytes","name":"_message","internalType":"bytes"}]}],
    ForeignBridgeAbi: [{"constant":true,"inputs":[],"name":"transactionHash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"sourceChainId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_contract","type":"address"},{"name":"_data","type":"bytes"},{"name":"_gas","type":"uint256"},{"name":"_dataType","type":"uint256"}],"name":"_sendMessage","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_txHash","type":"bytes32"}],"name":"relayedMessages","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_sourceChainId","type":"uint256"},{"name":"_destinationChainId","type":"uint256"},{"name":"_validatorContract","type":"address"},{"name":"_maxGasPerTx","type":"uint256"},{"name":"_gasPrice","type":"uint256"},{"name":"_requiredBlockConfirmations","type":"uint256"},{"name":"_owner","type":"address"}],"name":"initialize","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isInitialized","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"requiredBlockConfirmations","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_data","type":"bytes"},{"name":"_signatures","type":"bytes"}],"name":"executeSignatures","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_data","type":"bytes"}],"name":"getMinimumGasUsage","outputs":[{"name":"gas","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"_messageId","type":"bytes32"}],"name":"failedMessageReceiver","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBridgeMode","outputs":[{"name":"_data","type":"bytes4"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_sourceChainId","type":"uint256"},{"name":"_destinationChainId","type":"uint256"}],"name":"setChainIds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_messageId","type":"bytes32"}],"name":"failedMessageSender","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allowReentrantRequests","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"messageId","outputs":[{"name":"id","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_maxGasPerTx","type":"uint256"}],"name":"setMaxGasPerTx","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"requiredSignatures","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"validatorContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"deployedAtBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBridgeInterfacesVersion","outputs":[{"name":"major","type":"uint64"},{"name":"minor","type":"uint64"},{"name":"patch","type":"uint64"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"messageSourceChainId","outputs":[{"name":"id","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_blockConfirmations","type":"uint256"}],"name":"setRequiredBlockConfirmations","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"destinationChainId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_gasPrice","type":"uint256"}],"name":"setGasPrice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_enable","type":"bool"}],"name":"setAllowReentrantRequests","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_messageId","type":"bytes32"}],"name":"messageCallStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"messageSender","outputs":[{"name":"sender","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimalShift","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_contract","type":"address"},{"name":"_data","type":"bytes"},{"name":"_gas","type":"uint256"}],"name":"requireToPassMessage","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_messageId","type":"bytes32"}],"name":"failedMessageDataHash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxGasPerTx","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"gasPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"messageId","type":"bytes32"},{"indexed":false,"name":"encodedData","type":"bytes"}],"name":"UserRequestForAffirmation","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"executor","type":"address"},{"indexed":true,"name":"messageId","type":"bytes32"},{"indexed":false,"name":"status","type":"bool"}],"name":"RelayedMessage","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"gasPrice","type":"uint256"}],"name":"GasPriceChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"requiredBlockConfirmations","type":"uint256"}],"name":"RequiredBlockConfirmationChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"previousOwner","type":"address"},{"indexed":false,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]
}

export {contractAbi};