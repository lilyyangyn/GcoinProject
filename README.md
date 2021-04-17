# HKU CS FYP - Gcoin Gaming Platform
This is a final year project from HKU CS student. We implement a gaming assets exchange platform based on a blockchain.
## Table of Contents
- [Tools List](#tools-list)
  - [Smart Contracts](#smart-contracts)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Frontend Installation](#frontend-installation)
- [Backend Installation](#backend-installation)
- [Hints on Blockchain](#hints-on-blockchain)

## Tools List
### Smart Contracts
[Solidty](https://soliditylang.org/) - v0.7.4

[Truffle](https://trufflesuite.com/) - v5.1.16

[Web3.js](https://github.com/ethereum/web3.js/) - v1.2.1

### Frontend
[npm](https://www.npmjs.com/) - v7.3.0

[Vue](https://vuejs.org/) - @vue/cli v4.5.9

Electron - xxx

### Backend
AWS Ubuntu 18.04.5 LTS default java version setting
openjdk version "11.0.10" 2021-01-19
OpenJDK Runtime Environment (build 11.0.10+9-Ubuntu-0ubuntu1.18.04)

## Frontend Installation
Move to `fontend` folder
```
cd frontend
```
Check node version. If not a valid version, install it
```
nvm install 10.14.0
```
Install related package
```
npm install
```
Run Electron
```
npm run electron:serve
```

## Backend Installation

## Hints on Blockchain
Please make sure the home- and child-chain are on when testing.

- See details of chains and deployed smart contracts at: https://github.com/NicholsonTsang/GcoinProject/blob/gcoin/frontend/src/scripts/web3Util/config.js

- See contracts ABI at: https://github.com/NicholsonTsang/GcoinProject/blob/gcoin/frontend/src/scripts/web3Util/contractAbi.js

Please make sure the validators are started when testing.
