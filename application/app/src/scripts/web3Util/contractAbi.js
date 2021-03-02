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
}

export {contractAbi};