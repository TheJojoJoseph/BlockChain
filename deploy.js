const HDWallerProvider = require("@truffle/hdwallet-provider")
const Web3 = require("web3");
const { interface, bytecode } = require("./compile")

const provider = new HDWallerProvider(
    'crouch jewel shrug floor opinion else wedding supreme orient spoil ball scale',
    'https://rinkeby.infura.io/v3/0627dca7b40a4933a1b5ebca814a5b96'
);
const web3 = new Web3(provider);


const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy from accounts" , accounts[0]);
    await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data : bytecode , arguments :['Hi there']})
        .send({ gas : '1000000', from : accounts[0]});
    console.log('Contract successfully deploy', accounts[0]);
    provider.engine.stop(); // to privent hanging deployement 
    
};
deploy();