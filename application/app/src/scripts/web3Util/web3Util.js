import Web3 from "web3";
import {contractAbi} from "@/scripts/web3Util/contractAbi";
import {utilConfig} from "@/scripts/web3Util/config";

const web3Util = {
    web3: null,
    web3Initialize: async function(){
        this.web3 = new Web3(new Web3.providers.HttpProvider(utilConfig.networkRPC.parentNetworkRPC));
    },
    getUSDTFromFaucet: async function(){
        // let contractAbi = [{"inputs":[{"internalType":"address","name":"USDT_Contract_Address","type":"address"},{"internalType":"address","name":"provider","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"USDT_Contract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_a","type":"address"}],"name":"getUSDT","outputs":[],"stateMutability":"nonpayable","type":"function"}];
        // let contractAddress = "0x415cCa4B51552c9854CfF03656a38dD8664a087A";
        let privateKey = "c9e0723ee95a1aa3d12d161be4d210d6ddf4e23e09c65ac1387ec1398a267f71";
        let userAddress = "0x2f56b78D2d3B5EF6FDf0A6c2415089909496C646";

        const myContract = new this.web3.eth.Contract(contractAbi.USDTFaucetAbi,utilConfig.homeChainContractAddress.USDT_Faucet);

        const tx = {
            from: userAddress,
            to: utilConfig.homeChainContractAddress.USDT_Faucet,
            gas: 100000,
            gasPrice: 10,
            value: 0,
            data: myContract.methods.getUSDT("0x2f56b78D2d3B5EF6FDf0A6c2415089909496C646").encodeABI()
        };

        const signPromise = this.web3.eth.accounts.signTransaction(tx, privateKey);
        signPromise.then((signedTx) => {
            const sentTx = this.web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
            sentTx.on("receipt", receipt => {
                console.log(receipt);
            });
            sentTx.on("error", err => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    }
}

export {web3Util};