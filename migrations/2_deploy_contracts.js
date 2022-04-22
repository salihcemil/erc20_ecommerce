const Usdt = artifacts.require('Usdt.sol');
const PaymentProcessor = artifacts.require('PaymentProcessor.sol');

module.exports = async function (deployer, network, addressses) {
  const [admin, payer, _] = addressses;

  if(network === 'development'){
      await deployer.deploy(Usdt);
      const usdt = await Usdt.deployed();
      //await usdt.faucet(payer, web3.utils.toWei('10000'));
      
      await deployer.deploy(PaymentProcessor, admin, usdt.address);
  }else if(network === 'rinkeby'){
      await deployer.deploy(Usdt);
      const usdt = await Usdt.deployed();
      //await usdt.faucet(payer, web3.utils.toWei('10000'));
      
      await deployer.deploy(PaymentProcessor, admin, usdt.address);
  }
  else{
      const ADMIN_ADDRESS = '0xf73bEe14bA3D2313609503237E1FCAdcE764a665';
      const USDT_ADDRESS = '0x3B00Ef435fA4FcFF5C209a37d1f3dcff37c705aD';
      await deployer.deploy(PaymentProcessor, ADMIN_ADDRESS, USDT_ADDRESS);
  }
};
