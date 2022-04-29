const assert = require("assert");  //comparison 
const ganache = require("ganache-cli");  //
const { interfaces } = require("mocha");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface , bytecode } = require('../compile') 


let accounts;

beforeEach( async () => {   
    //Get a list of all accounts
    accounts = await web3.eth.getAccounts()
     
    //We will use pne of those accounts to deploy contract 
    inbox = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data : bytecode ,arguments : ['Hi there']})
      .send({ from :accounts[0] , gas : '1000000'})  
});

describe("Inbox", () => {
  it("deploy contract", () => {
   // console.log (inbox);
    assert.ok(inbox.options.address);
  });
  it ("has  a default message ", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there');
  });
  it("set message", async () => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0]} )
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  })
});
