geth --nousb --datadir=$pwd --syncmode 'full' --port 30312 --miner.gasprice 0 --miner.gastarget 470000000000 --http --http.addr 'localhost' --http.port 8547 --http.api admin,eth,miner,net,txpool,personal,web3 --mine --allow-insecure-unlock --unlock "0xe3bf59b763d69cd3e05dc16d3f5a5b10ba96c521" --password password.txt &
echo “Geth started on node 2”

