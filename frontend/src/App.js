import React, { useState, useEffect, useCallback } from 'react';
import Store from './Store.js';
import getBlockchain from './ethereum.js';

import Navbar from './Navbar';

function App() {
  const [paymentProcessor, setPaymentProcessor] = useState(undefined); 
  const [usdt, setUsdt] = useState(undefined); 
  const [publicKey, setPublicKey] = useState(undefined);
  const [account, setAccount] = useState('');

  useEffect(() => {
    const init = async () => {
      const { paymentProcessor, usdt } = await getBlockchain();
      setPaymentProcessor(paymentProcessor);
      setUsdt(usdt);

      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      setAccount(accounts[0]);
      window.ethereum.request({method: 'eth_getEncryptionPublicKey', params: [accounts[0]]}).
        then((result) => {
          setPublicKey(result);
        })
        .catch((error) => {
            console.error(error);
          });
    }
    init();
  }, []);

  if(typeof window.ethereum === 'undefined') {
    return (
      <div className='container'>
        <div className='col-sm-1'>
          <h1>ERC20 Tokens Ecommerce App</h1>
          <p>You need to install the latest version of Metamask to use this app. MEtamask is an Ethereum wallet, available as a Google chrome extension.</p>
          <ul>
            <li>Go to the <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'>Metamask page</a> on the chrome webstore and install it</li>  
            <li>If you already have it installed, uninstall and re-install it</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <div className='col-sm-12'>
      <Navbar/>
      <Store paymentProcessor={paymentProcessor} usdt={usdt} publicKey={publicKey} />
      </div>
    </div>
  );
}

export default App;
