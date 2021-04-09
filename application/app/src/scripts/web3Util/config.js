const utilConfig = {
    networkRPC:{
        parentNetworkRPC:"https://sokol.poa.network",
        childNetworkRPC:"https://kovan.infura.io/v3/ced2c5d2f8d3400b816ba80f23133260"
    },
    homeChainContractAddress: {
        USDT: "0x78c65f03b5fa97b41ac63b395fad11dccf915a2a",
        USDT_Faucet: "0x415cCa4B51552c9854CfF03656a38dD8664a087A",
        Bridgeable_Token: "0x10fd971Dab524A87537E0Ea8af7EC7Eb7d117f95",
        Bridge_ERC677_Extension_Mediator: "0x194F052528d5FbBEd085004C6451Ef116dD61173",
        USDT_Exchcoin_Exchange: "0x1650089d337dB2312d47983A62cf3735b838e8d3",
        AMBBridgeHelper: "0x40F0606f7dbA8BF0863773052DE49489F6ca6E19",
    },
    childChainContractAddress:{
        Bridgeable_Token: "0x5362490a5c48cBc2a686DEE73695CE52f7eBbD3c",
        Bridge_ERC677_Extension_Mediator: "0xaE3E850013D4045709610893156175354340Bb19",
        Gcoin: "0x920fC75Ed48EDA7E5DfcFf7a8bBe806b4E1527e9",
        Gcoin_Exchcoin_Exchange: "0xe61362B1D413831BDAb8D3E6862662C3dc395031",
        Foreign_Bridge_Mediator: "0xFe446bEF1DbF7AFE24E81e05BC8B271C1BA9a560"
    },
    faucet:{
        faucetPublicKey:"0xBBdab9F0788C25763A461A16F8e8b8d01Ef2D6C8",
        faucetAccPrivateKey:"5163306b4585562200c1102805c215b42fb3fc2863c55c9fe0d0a2bbf18d7f93",
        childChainGasFaucetValue:100000000000000000,
        homeChainGasFaucetValue:100000000000000000
    }
}

export {utilConfig}