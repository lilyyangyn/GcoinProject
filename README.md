# GcoinProject

Ethereum Private Chain setup:

  Two nodes are created. Steps to run and connect two nodes to form a blockchain network:
  
  /GcoinProject/devnet/node1:
  
  $sh node1.sh
  
  /GcoinProject/devnet/node2:
  
  $sh node2.sh
    
    After running the above shell documents, the node will run as daemon process in different ports, so closing the terminal should not be the right way to stop the process.
    To stop the process, run the following command:
    $ ps ax | grep geth
    $ kill <process id> 
  
  Ethereum Private Chain setup reference material: https://www.c-sharpcorner.com/article/setup-your-private-ethereum-network-with-geth2/
  
  
Run electron:

  $ cd application
  $ cd app
  $ npm run electron:serve
  
  if not on electron:
  
  $ npm run serve
  
