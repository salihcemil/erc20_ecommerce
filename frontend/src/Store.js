import React, { useState } from 'react';
import {ethers} from 'ethers';
import axios from 'axios';
import conf from './config.json'; 


const API_URL = conf.API_URL;
const SellerPubKey = '003X9PaFsuG2XUxV6OPHYiTR6buqNPCbeZzOxtCiuWE=';

const ITEMS = [{
    id: '1',
    price: ethers.utils.parseEther('1')
},{
    id: '2',
    price: ethers.utils.parseEther('2')
}
];

function Store({ paymentProcessor, usdt, publicKey }) {
    const [name, setName] = useState(undefined);
    const [mail, setMail] = useState(undefined);
    const [address, setAddress] = useState(undefined);
    const [phone, setPhone] = useState(undefined);

    const buy = async item => {
        if(name === '' || name === undefined ||
           mail === '' || mail === undefined ||
           address === '' || address === undefined||
           phone === '' || phone === undefined) {
            alert('User info should be completed!');
            return;
        }
        //generate the user info
        const requestPaymentObject = {
                    publicKey: publicKey,
                    itemId: item.id,
                    pubKey: item.publicKey,
                    name: name,
                    mail: mail,
                    address: address,
                    phone: phone
                };
        
        //request server to create a payment object and return a GUID related the payment
        const payment = await axios.post(`${API_URL}/api/getPaymentId`, requestPaymentObject);
        
        //let the Payment Processor contract to transfer amount of the price
        let instance = await usdt.deployed();
        const tx1 = await instance.approve(paymentProcessor.address, item.price);
        await tx1.wait();

        //encrypt the payment info with the seller's public key. Although the network is public 
        //no one who listens to the Ethereum transactions or events cannot read the shopping data unless he/she has the private key
        const encrypted = await axios.post(`${API_URL}/api/encryptWithPK/`, {
            message: payment.data,
            pubKey: SellerPubKey
            });

        //run Payment Processor's pay function
        const tx2 = await paymentProcessor.pay(item.price, JSON.stringify(encrypted));
        const receipt = await tx2.wait();
    
        await new Promise(resolve => setTimeout(resolve, 5000)); 
        const paymentResult = await axios.get(`${API_URL}/api/getPaymentResult/${payment.data}`)
        console.log(paymentResult);
    };

    function handleChange(event) {
        if(event.target.name === 'name'){setName(event.target.value)}
        else if(event.target.name === 'email'){setMail(event.target.value)}
        else if(event.target.name === 'address'){setAddress(event.target.value)}
        else if(event.target.name === 'phone'){setPhone(event.target.value)}
      }

    return (
        <ul className='list-group'>
            <li className='list-group-item'>
                <table>
                    <tbody>
                        <tr>
                            <td>Name: </td>
                            <td>
                                <input type="text" name="name" placeholder="Mick Jagger" onChange={handleChange}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>E-Mail: </td>
                            <td>
                                <input type="email" name="email" placeholder="mickjagger@yeeha.com" onChange={handleChange}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>Address: </td>
                            <td>
                                <input type="address" name="address" placeholder="marasi dr no 12 dubai" onChange={handleChange}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>Phone: </td>
                            <td>
                                <input type="phone" name="phone" placeholder="+971584563526" onChange={handleChange}></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </li>
            
            <li className='list-group-item'>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                Item1 - <span className='front-weight-bold'>3 USDT</span>
                            </td>
                            <td>
                                <button type='button'
                                className='btn btn-primary float-right'
                                onClick={()=>buy(ITEMS[0])}>
                                    Pay
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Item2 - <span className='front-weight-bold'>4 USDT</span>
                            </td>
                            <td>
                                <button type='button'
                                className='btn btn-primary float-right'
                                onClick={()=>buy(ITEMS[1])}>
                                    Pay
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </li>
        </ul>
    )
}

export default Store;