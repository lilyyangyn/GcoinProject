# Childchain smart contracts
---
Contracts in this folder are deployed in our Gcoin child chain, where all business-related transactions will happen.
You can find the contracts' source code in the 'contracts' folder.

## Deployment to your own childchian
Configure `truffle-config.js` to your network
```
development: {
     host: "18.141.144.212",     
     port: 8545,            
     network_id: "4801", 
     gas: 4600000,      
},
```
Then, compile and migrate. 
```
truffle migrate
``` 