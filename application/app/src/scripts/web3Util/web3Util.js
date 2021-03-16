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
        console.log("Initializing home-chain web3...");
        this.parentChainWeb3 = new Web3(new Web3.providers.HttpProvider(utilConfig.networkRPC.parentNetworkRPC));
    },

    childChainWeb3Initialize: async function () {
        console.log("Initializing game-chain web3...");
        this.childChainWeb3 = new Web3(new Web3.providers.HttpProvider(utilConfig.networkRPC.childNetworkRPC));
    },

    //Utilized by the write function to sign the transaction for EVM state update
    signTransaction: function (web3, tx,privateKey, resolveCallback, comfirmCallback, errorCallback, confirmation = 1) {
        const signPromise = web3.eth.accounts.signTransaction(tx, privateKey);
        console.log("here");
        signPromise.then((signedTx) => {
            console.log(signedTx);
            const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
            sentTx.then((resolved)=>{
                // console.log(resolved);
                if (resolveCallback) {
                    resolveCallback(resolved);
                }
            })
            sentTx.on('transactionHash', hash => console.log("Transaction Generated: " + hash));
            sentTx.on("receipt", receipt => console.log(receipt));
            sentTx.on("error", error => (error) => {
                console.error(error);
                if (errorCallback) {
                    errorCallback(error);
                }
            });
            sentTx.on("confirmation", (num, obj) => {
                if (num == confirmation) {
                    console.log("Transaction Comfirmed: " + obj.transactionHash);
                    if (comfirmCallback) {
                        comfirmCallback(num, obj);
                    }
                }
            })
            // sentTx.on("receipt", receipt => {
            //     console.log(receipt);
            //     callbackFunction("got the receipt");
            //
            // });
            // sentTx.on("error", err => {
            //     console.log(err);
            // });
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
        // console.log(resolvedValue);
        return resolvedValue;
    },

    //Eth account creation
    createAcc: async function () {
        if (web3Util.parentChainWeb3 == null) {
            await web3Util.homeChainWeb3Initialize();
        }
        return this.parentChainWeb3.eth.accounts.create();
        // alert("Public Key: \n" + accountInfo.address + "\n" + "Private Key: \n" + accountInfo.privateKey + "\n\n" +
        //     "Please make sure you keep the private key safely, otherwise you are unable to use your account for transaction");
    // .then((resolved) => {
    //         console.log(resolved);
    //     });
    },

    //private key to public key
    privateKeyToPublicKey: async function (privateKey) {
      if (web3Util.parentChainWeb3 == null) {
          await web3Util.homeChainWeb3Initialize();
      }
      return this.parentChainWeb3.eth.accounts.privateKeyToAccount(privateKey);
    },

    checkHomeChainBalance: async function (address) {
        if (web3Util.parentChainWeb3 == null) {
            await web3Util.homeChainWeb3Initialize();
        }
        return this.parentChainWeb3.eth.getBalance(address);
    },

    checkChildChainBalance: async function (address) {
        if (web3Util.childChainWeb3 == null) {
            await web3Util.childChainWeb3Initialize();
        }
        return this.childChainWeb3.eth.getBalance(address);
    },

    //Write Function
    getUSDTFromFaucet: async function (receiver, resolveCallback) {

        if (web3Util.parentChainWeb3 == null) {
            await web3Util.homeChainWeb3Initialize();
        }

        alert(receiver);
        const myContract = new this.parentChainWeb3.eth.Contract(contractAbi.USDTFaucetAbi, utilConfig.homeChainContractAddress.USDT_Faucet);

        const tx = {
            to: utilConfig.homeChainContractAddress.USDT_Faucet,
            gas: 100000,
            gasPrice: 10000000000,
            value: 0,
            data: myContract.methods.getUSDT(receiver).encodeABI()
        };
        if (localStorage.getItem('privateKey') == "" || localStorage.getItem('privateKey') == null){
            this.$Message.error("You should first set your key in wallet manager");
        }else{
            this.signTransaction(this.parentChainWeb3, tx, localStorage.getItem('privateKey'), resolveCallback);
        }
    },

    getParentChainGasFromFaucet: async function (receiver,resolveCallback) {

        if (web3Util.parentChainWeb3 == null) {
            await web3Util.homeChainWeb3Initialize();
        }

        const tx = {
            from: utilConfig.faucet.faucetPublicKey,
            to: receiver,
            gas: 100000,
            gasPrice: 10000000000,
            value: utilConfig.faucet.homeChainGasFaucetValue,
        };
        this.signTransaction(this.parentChainWeb3, tx, utilConfig.faucet.faucetAccPrivateKey, resolveCallback);
    },

    getChildChainGasFromFaucet: async function (receiver,resolveCallback) {
        alert(receiver);
        if (web3Util.childChainWeb3 == null) {
            await web3Util.childChainWeb3Initialize();
        }

        const tx = {
            from: utilConfig.faucet.faucetPublicKey,
            to: receiver,
            gas: 1000000,
            gasPrice: 10000000000,
            value: utilConfig.faucet.childChainGasFaucetValue,
        };
        this.signTransaction(this.childChainWeb3, tx, utilConfig.faucet.faucetAccPrivateKey, resolveCallback);
    },
    //transfer and call
    transferAndCall: async function (value,resolveCallback) {
        if (web3Util.parentChainWeb3 == null) {
            await web3Util.homeChainWeb3Initialize();
        }

        const myContract = new this.parentChainWeb3.eth.Contract(contractAbi.bridgeTokenAbi, utilConfig.homeChainContractAddress.Bridgeable_Token);

        const tx = {
            to: utilConfig.homeChainContractAddress.Bridgeable_Token,
            gas: 1000000,
            gasPrice: 10000000000,
            value: 0,
            data: myContract.methods.transferAndCall(utilConfig.homeChainContractAddress.Bridge_ERC677_Extension_Mediator,value,"0x").encodeABI()
        };
        if (localStorage.getItem('privateKey') == "" || localStorage.getItem('privateKey') == null){
            this.$Message.error("You should first set your key in wallet manager");
        }else{
            this.signTransaction(this.parentChainWeb3, tx, localStorage.getItem('privateKey'), resolveCallback);
        }
    },

    signExecute: async function (message, signature, resolveCallback) {

        if (web3Util.childChainWeb3 == null) {
            await web3Util.childChainWeb3Initialize();
        }

        const myContract = new this.childChainWeb3.eth.Contract(contractAbi.ForeignBridgeAbi, utilConfig.childChainContractAddress.Foreign_Bridge_Mediator);

        const tx = {
            to: utilConfig.childChainContractAddress.Foreign_Bridge_Mediator,
            gas: 10000000,
            gasPrice: 10000000000,
            value: 0,
            data: myContract.methods.executeSignatures(message, signature).encodeABI()
        };
        if (localStorage.getItem('privateKey') == "" || localStorage.getItem('privateKey') == null){
            this.$Message.error("You should first set your key in wallet manager");
        }else{
            console.log("___________HERE__________");
            this.signTransaction(this.childChainWeb3, tx, localStorage.getItem('privateKey'), resolveCallback);
        }
    },
    //Read function

    //Get user balance

    getUserUSDTBalance: async function () {

        if (web3Util.parentChainWeb3 == null) {
            await web3Util.homeChainWeb3Initialize();
        }

        if (localStorage.getItem('address') == "" || localStorage.getItem('privateKey') == null){
            this.$Message.error("You should first set your key in wallet manager");
        }else{
            const contract = new this.parentChainWeb3.eth.Contract(contractAbi.USDTAbi, utilConfig.homeChainContractAddress.USDT);
            let contractCallPromise = contract.methods.balanceOf(localStorage.getItem('address')).call();
            return await this.readContract(contractCallPromise, contract);
        }
    },

    getUserParentChainExchangeCoinBalance: async function () {

        if (web3Util.parentChainWeb3 == null) {
            await web3Util.homeChainWeb3Initialize();
        }

        if (localStorage.getItem('address') == "" || localStorage.getItem('privateKey') == null){
            this.$Message.error("You should first set your key in wallet manager");
        }else{
            const contract = new this.parentChainWeb3.eth.Contract(contractAbi.bridgeTokenAbi, utilConfig.homeChainContractAddress.Bridgeable_Token);
            let contractCallPromise = contract.methods.balanceOf(localStorage.getItem('address')).call();
            return await this.readContract(contractCallPromise, contract);
        }


    },

    getUserChildChainExchgCoinBalance: async function () {

        if (web3Util.childChainWeb3 == null) {
            await web3Util.childChainWeb3Initialize();
        }

        if (localStorage.getItem('address') == "" || localStorage.getItem('privateKey') == null){
            this.$Message.error("You should first set your key in wallet manager");
        }else{
            const contract = new this.childChainWeb3.eth.Contract(contractAbi.bridgeTokenAbi, utilConfig.childChainContractAddress.Bridgeable_Token);
            let contractCallPromise = contract.methods.balanceOf(localStorage.getItem('address')).call();
            return await this.readContract(contractCallPromise, contract);
        }


    },

    getSignature: async function(encodedData){

        if (web3Util.parentChainWeb3 == null) {
            await web3Util.homeChainWeb3Initialize();
        }

        if (localStorage.getItem('address') == "" || localStorage.getItem('privateKey') == null){
            this.$Message.error("You should first set your key in wallet manager");
        }else{
            const contract = new this.parentChainWeb3.eth.Contract(contractAbi.AMBBridgeHelperAbi, utilConfig.homeChainContractAddress.AMBBridgeHelper);
            let contractCallPromise = contract.methods.getSignatures(encodedData).call();
            return await this.readContract(contractCallPromise, contract);
        }
    },

    //test: later Delete
    test: async function(){
        if (web3Util.childChainWeb3 == null) {
            await web3Util.childChainWeb3Initialize();
        }

        if (localStorage.getItem('address') == "" || localStorage.getItem('privateKey') == null){
            this.$Message.error("You should first set your key in wallet manager");
        }else{
            const contract = new this.childChainWeb3.eth.Contract(contractAbi.ForeignBridgeAbi, utilConfig.childChainContractAddress.Foreign_Bridge_Mediator);
            let contractCallPromise = contract.methods.requiredSignatures().call();
            return await this.readContract(contractCallPromise, contract);
        }
    },


}

export {web3Util};