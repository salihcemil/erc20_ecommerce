import React, { useState, useEffect, componentWillMount, Component } from 'react';
import Store from './Store.js';
import getBlockchain from './ethereum.js';


class admin extends Component{
  constructor(props) {
    super(props);
    this.state = {
      paymentProcessor: '',
      usdt: '',
      account: ''
    }
  }

  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const [_paymentProcessor, _usdt] = await getBlockchain();
    console.log(_paymentProcessor);
    console.log(_usdt);
    const _accounts = await window.ethereum.request({ method: 'eth_accounts' });
    console.log(_accounts);
    this.setState({ paymentProcessor: _paymentProcessor, usdt: _usdt, account: _accounts[0] })
  }

  render() {
    return (
      <div className="container">
        <p>Your account: {this.state.account}</p>
      </div>
    );
  }
}

export default admin;
// function Admin() {
//   const [paymentProcessor, setPaymentProcessor] = useState(undefined); 
//   const [usdt, setUsdt] = useState(undefined); 

//   const [account, setAccount] = useState('');

//   useEffect(() => {
//     const init = async () => {
//       const { paymentProcessor, usdt } = await getBlockchain();
//       setPaymentProcessor(paymentProcessor[0]);
//       setUsdt(usdt[0]);

//       const accounts = await window.ethereum.request({ method: 'eth_accounts' });
//       setAccount(accounts[0]);

//       console.log(paymentProcessor);
//     }
//     init();
//   }, []);

//   function handleChange(){

//   }

//   return (
//       <ul className='list-group'>
//             <fieldset>
//                 <legend>Payment Gateway Contract Info:</legend>
//                 <li className='list-group-item'>
//                     <table>
//                         <tbody>
//                           <tr>
//                             <td>Connected Account: </td>
//                             <td>{account}</td> 
//                           </tr>
//                           <tr>
//                                 <td>Payment Processor Contract:</td>
//                                 <td>{ paymentProcessor }</td>
//                             </tr>
//                             <tr>
//                                 <td>Transfer Ownership to: </td>
//                                 <td>
//                                     <input type="text" name="owner" placeholder="0xabc123" onChange={handleChange}></input>
//                                     <button type="button">OK</button>
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td>Change Currency Address to: </td>
//                                 <td>
//                                     <input type="text" name="currency" placeholder="0xabc123" onChange={handleChange}></input>
//                                     <button type="button">OK</button>
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td>Change Receiver Address to: </td>
//                                 <td>
//                                     <input type="text" name="receiver" placeholder="0xabc123" onChange={handleChange}></input>
//                                     <button type="button">OK</button>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </li>
//             </fieldset>
//             </ul>
//   )
// }

// export default Admin;