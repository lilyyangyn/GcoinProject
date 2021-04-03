const functions = require("firebase-functions");
const Web3 = require("web3");
const abiDecoder = require("abi-decoder");
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
admin.initializeApp();

const db = admin.firestore();

const childChainWeb3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/v3/ced2c5d2f8d3400b816ba80f23133260"));
const Abi = [{"inputs": [{"internalType": "uint8", "name": "_decimals", "type": "uint8"}, {"internalType": "uint256", "name": "_totalSupply", "type": "uint256"}], "stateMutability": "nonpayable", "type": "constructor"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "_owner", "type": "address"}, {"indexed": true, "internalType": "address", "name": "_spender", "type": "address"}, {"indexed": false, "internalType": "uint256", "name": "_value", "type": "uint256"}], "name": "Approval", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "_from", "type": "address"}, {"indexed": true, "internalType": "address", "name": "_to", "type": "address"}, {"indexed": false, "internalType": "uint256", "name": "_value", "type": "uint256"}], "name": "Transfer", "type": "event"}, {"inputs": [{"internalType": "address", "name": "_owner", "type": "address"}, {"internalType": "address", "name": "_spender", "type": "address"}], "name": "allowance", "outputs": [{"internalType": "uint256", "name": "remaining", "type": "uint256"}], "stateMutability": "view", "type": "function"}, {"inputs": [{"internalType": "address", "name": "_spender", "type": "address"}, {"internalType": "uint256", "name": "_value", "type": "uint256"}], "name": "approve", "outputs": [{"internalType": "bool", "name": "success", "type": "bool"}], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "address", "name": "_owner", "type": "address"}], "name": "balanceOf", "outputs": [{"internalType": "uint256", "name": "balance", "type": "uint256"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "decimals", "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "name", "outputs": [{"internalType": "string", "name": "", "type": "string"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "symbol", "outputs": [{"internalType": "string", "name": "", "type": "string"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "totalSupply", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"}, {"inputs": [{"internalType": "address", "name": "_to", "type": "address"}, {"internalType": "uint256", "name": "_value", "type": "uint256"}], "name": "transfer", "outputs": [{"internalType": "bool", "name": "success", "type": "bool"}], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "address", "name": "_from", "type": "address"}, {"internalType": "address", "name": "_to", "type": "address"}, {"internalType": "uint256", "name": "_value", "type": "uint256"}], "name": "transferFrom", "outputs": [{"internalType": "bool", "name": "success", "type": "bool"}], "stateMutability": "nonpayable", "type": "function"}];
const allowedOrigin = "http://localhost:8080";
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.test = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', allowedOrigin);
  response.set('Access-Control-Allow-Credentials', 'true')
  // response.status(200).send({code:0, message:"", data: "reponse from test ?function"});
  response.send("Hello world");
  // cors(request, response, () => {
  //     response.status(200).send({code:0, message:"", data: "reponse from test function"})
  // })
  // childChainWeb3.eth.getTransaction('0x9dae89fdf190d9ab2a48826f6a4d794764ab5c283019ac19d7702469f7be266d').then(resolve => {
  //     //resolve Gcoin transfer amount and sender Address
  //     let account;
  //     abiDecoder.addABI(Abi);
  //     account = abiDecoder.decodeMethod(resolve.input).params[0].value;
  //     response.send(account);
  // })
})

//request param: gameItemID, itemReceiverUserID, paymentAccount
exports.createOrder = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', allowedOrigin);
  response.set('Access-Control-Allow-Credentials', 'true');
  //check the all param provided
  if(request.body.itemReceiverUserID == null || request.body.paymentAccount == null || request.body.gameItemID == null){
    response.send({code:2,message:"Create Order Fail, param not provided",data:""});
    return;
  }
  let orderID = Math.random().toString(36).substr(2, 10);
  let itemReceiver = request.body.itemReceiverUserID;
  let paymentAccount = request.body.paymentAccount;
  let orderItemID = request.body.gameItemID;
  let itemPrice;
  let itemName;
  let gameShopAccount;
  functions.logger.log("itemReceiverUserID: " + request.body.itemReceiverUserID);
  db.collection('gameItemList').where('itemID', '==', 1).get().then(resolve =>{
    // functions.logger.info(resolve);
    resolve.forEach(doc => {
      let retrievedData = doc.data();
      itemPrice = retrievedData.value.toString();
      itemName = retrievedData.itemName;
      gameShopAccount = retrievedData.gameShopAccount;
      writeOrderToDB(orderID,itemReceiver, orderItemID, itemName, itemPrice, gameShopAccount, paymentAccount)
          .then(r => {
            response.send({code:0,message:"",data:{
                orderID:orderID,
                itemReceiver: itemReceiver,
                orderItemID: orderItemID,
                itemName: itemName,
                itemPrice: itemPrice,
                gameShopAccount: gameShopAccount,
                paymentAccount: paymentAccount
            }});
          }).catch(e => {
        functions.logger.info(e);
        response.send({code:2,message:"Create Order Fail",data:""});
      });
    })

  }).catch(e =>{
    response.send(itemPrice);
  })
});

//0x9dae89fdf190d9ab2a48826f6a4d794764ab5c283019ac19d7702469f7be266d
//glo660ajw9
//request param: orderID, txHash
exports.verifyTransaction = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', allowedOrigin);
  response.set('Access-Control-Allow-Credentials', 'true');
  let orderID = request.body.orderID;
  let txHash = request.body.transactionHash;
  checkTransactionExist(txHash).then(resolve => {
    if (resolve == true) {
      functions.logger.info("Invalid Receipt");
      response.send({code:2, message:"this tx had already been used", data:""});
    } else if (resolve == false) {
      getOrderFromDB(orderID).then(resolve => {
        let order = resolve;
        childChainWeb3.eth.getTransaction(txHash).then(resolve => {

          //resolve Gcoin transfer amount, sender Address and receiver address
          let txGcoinAmount;
          let txPaymentAccount;
          let txReceiverAccount;
          abiDecoder.addABI(Abi);
          txGcoinAmount = abiDecoder.decodeMethod(resolve.input).params[1].value;
          txPaymentAccount = resolve.from;
          txReceiverAccount = abiDecoder.decodeMethod(resolve.input).params[0].value;

          //check whether the payer and gcoin amount is same as the order
          let valid = txOrderValidation(order, txGcoinAmount, txPaymentAccount, txReceiverAccount);
          if (valid == true) {
            functions.logger.info("Tx match with the order");
            writeTxToDB(txHash, txGcoinAmount, txPaymentAccount, order, orderID).then(r => {
              functions.logger.info("Tx is written into DB");
              let responseMsg = {code:0, message:"",data:r};
              response.send(responseMsg);
            }).catch(e => {
              response.send({code:2, message:"Fail to write tx to DB", data:""});
            });
          }
        })
      });
    }
  });
  // if (){
  //
  // }

});

async function writeTxToDB(txHash,txGcoinAmount, txPaymentAccount,order, orderID) {
  const docRef = db.collection('transaction').doc(txHash);
  let tx = order;
  tx.txAmount = txGcoinAmount;
  tx.payerAccount = txPaymentAccount;
  tx.orderID = orderID;
  await docRef.set(tx);
  return tx;
}

async function writeOrderToDB(orderID,itemReceiver, orderItemID, itemName, itemPrice, gameShopAccount, paymentAccount) {
  const docRef = db.collection('order').doc(orderID);
  functions.logger.log(orderID + " "+ itemReceiver+ " "+ orderItemID+ " "+ itemName + " "+ itemPrice + " "+ gameShopAccount+ " "+ paymentAccount);
  await docRef.set({
    itemReceiverID: itemReceiver,
    orderItemID: orderItemID,
    itemName: itemName,
    itemPrice: itemPrice,
    gameShopAccount: gameShopAccount,
    paymentAccount: paymentAccount
  });
}

async function getOrderFromDB(orderID) {
  const orderRef = db.collection('order').doc(orderID);
  const doc = await orderRef.get();
  if (!doc.exists) {
    functions.logger.error("No Such File, FileID: "+orderID);
  } else {
    return doc.data();
  }
}

function txOrderValidation(order, txGcoinAmount, txPaymentAccount, txReceiverAccount) {
  if (order.itemPrice != txGcoinAmount){
    functions.logger.info("wrong payment amount");
    return false;
  }
  if (order.paymentAccount != txPaymentAccount){
    functions.logger.info("wrong payment account");
    return false;
  }
  if(order.gameShopAccount != txReceiverAccount){
    functions.logger.info("wrong target Account");
    return false;
  }
  return true;
}

async function checkTransactionExist(txHash) {
  let txRef = db.collection('transaction').doc(txHash);
  const doc = await txRef.get();
  if (!doc.exists) {
    return false;
  } else {
    return true;
  }
}

//1. create order
//2. transaction
//3. verify transaction

// longest chain to confirm whether the transaction is valid