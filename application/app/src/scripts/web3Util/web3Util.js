import Web3 from "web3";
import {contractAbi} from "@/scripts/web3Util/contractAbi";
import {utilConfig} from "@/scripts/web3Util/config";

const web3Util = {
    parentChainWeb3: null,
    childChainWeb3: null,

    //todo: write the privateKey and userAddress to local storage instead of hardcode
    privateKey: "c9e0723ee95a1aa3d12d161be4d210d6ddf4e23e09c65ac1387ec1398a267f71",
    userAddress: "0x2f56b78D2d3B5EF6FDf0A6c2415089909496C646",

    homeChainWeb3Initialize: async function () {
        this.parentChainWeb3 = new Web3(new Web3.providers.HttpProvider(utilConfig.networkRPC.parentNetworkRPC));
    },

    childChainWeb3Initialize: async function () {
        this.childChainWeb3 = new Web3(new Web3.providers.HttpProvider(utilConfig.networkRPC.childNetworkRPC));
    },

    //Utilized by the write function to sign the transaction for EVM state update
    signTransaction: function (web3, tx) {
        const signPromise = web3.eth.accounts.signTransaction(tx, this.privateKey);
        signPromise.then((signedTx) => {
            const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
            sentTx.on("receipt", receipt => {
                console.log(receipt);
            });
            sentTx.on("error", err => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    },

    readContract: async function (contractCallPromise, myContract) {
        let resolvedValue = null;
        // const contractCallPromise = myContract.methods.balanceOf(this.userAddress).call();
        await contractCallPromise.then((resolved) => {
            resolvedValue = resolved;
            // console.log(resolved);
        }).catch((err) => {
            console.log(err);
        });
        console.log(resolvedValue);
        return resolvedValue;
    },

    //Write Function
    getUSDTFromFaucet: async function () {

        if (web3Util.parentChainWeb3 == null) {
            await web3Util.homeChainWeb3Initialize();
        }

        const myContract = new this.parentChainWeb3.eth.Contract(contractAbi.USDTFaucetAbi, utilConfig.homeChainContractAddress.USDT_Faucet);

        const tx = {
            from: this.userAddress,
            to: utilConfig.homeChainContractAddress.USDT_Faucet,
            gas: 100000,
            gasPrice: 10,
            value: 0,
            data: myContract.methods.getUSDT("0x2f56b78D2d3B5EF6FDf0A6c2415089909496C646").encodeABI()
        };
        this.signTransaction(this.parentChainWeb3, tx);
    },

    //Read function

    //Get user balance

    getUserUSDTBalance: async function () {

        if (web3Util.parentChainWeb3 == null) {
            await web3Util.homeChainWeb3Initialize();
        }

        const contract = new this.parentChainWeb3.eth.Contract(contractAbi.USDTAbi, utilConfig.homeChainContractAddress.USDT);
        let contractCallPromise = contract.methods.balanceOf(this.userAddress).call();
        return await this.readContract(contractCallPromise, contract);
    },

    getUserParentChainExchangeCoinBalance: async function () {

        if (web3Util.parentChainWeb3 == null) {
            await web3Util.homeChainWeb3Initialize();
        }

        const contract = new this.parentChainWeb3.eth.Contract(contractAbi.bridgeTokenAbi, utilConfig.homeChainContractAddress.Bridgeable_Token);
        let contractCallPromise = contract.methods.balanceOf(this.userAddress).call();
        return await this.readContract(contractCallPromise, contract);
    },

    getUserChildChainExchgCoinBalance: async function () {

        if (web3Util.childChainWeb3 == null) {
            await web3Util.childChainWeb3Initialize();
        }

        const contract = new this.childChainWeb3.eth.Contract(contractAbi.bridgeTokenAbi, utilConfig.childChainContractAddress.Bridgeable_Token);
        let contractCallPromise = contract.methods.balanceOf(this.userAddress).call();
        return await this.readContract(contractCallPromise, contract);
    },


}

export {web3Util};