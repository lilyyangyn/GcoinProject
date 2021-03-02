const utilConfig = {
    networkRPC:{
        parentNetworkRPC:"https://sokol.poa.network",
        childNetworkRPC:"https://kovan.infura.io/v3/ced2c5d2f8d3400b816ba80f23133260"
    },
    homeChainContractAddress: {
        USDT: "0x78c65f03b5fa97b41ac63b395fad11dccf915a2a",
        USDT_Faucet: "0x415cCa4B51552c9854CfF03656a38dD8664a087A",
        Bridgeable_Token: "0x10fd971Dab524A87537E0Ea8af7EC7Eb7d117f95",
        Bridge_Mediator: "0x194F052528d5FbBEd085004C6451Ef116dD61173",
    },
    childChainContractAddress:{
        Bridgeable_Token: "0x5362490a5c48cBc2a686DEE73695CE52f7eBbD3c",
        Bridge_Mediator: "0xaE3E850013D4045709610893156175354340Bb19"
    }
}

export {utilConfig}