import React from "react";
import {ethers} from 'ethers';
import axios from 'axios';
import './card-style.css';
import conf from '../config.json'; 

const API_URL = conf.API_URL;
const SellerPubKey = '003X9PaFsuG2XUxV6OPHYiTR6buqNPCbeZzOxtCiuWE=';

const ITEMS = [{
    id: '0',
    price: ethers.utils.parseEther('8')
},{
    id: '1',
    price: ethers.utils.parseEther('6')
},
{
    id: '2',
    price: ethers.utils.parseEther('6')
},
{
    id: '3',
    price: ethers.utils.parseEther('7')
},
{
    id: '4',
    price: ethers.utils.parseEther('4')
},
{
    id: '5',
    price: ethers.utils.parseEther('4')
}
];

const Card = props => {
    const buy = async item => {
        var personalInfo = await props.getName();
        if(personalInfo.name === '' || personalInfo.name === undefined ||
        personalInfo.mail === '' || personalInfo.mail === undefined ||
        personalInfo.address === '' || personalInfo.address === undefined||
        personalInfo.phone === '' || personalInfo.phone === undefined) {
            alert('User info should be completed!');
            return;
        }

        //generate the user info
        const requestPaymentObject = {
            publicKey: props.publicKey,
            itemId: item.id,
            name: personalInfo.name,
            mail: personalInfo.mail,
            address: personalInfo.address,
            phone: personalInfo.phone
        };

        //request server to create a payment object and return a GUID related the payment
        const payment = await axios.post(`${API_URL}/api/getPaymentId`, requestPaymentObject);
        
        //let the Payment Processor contract to transfer amount of the price
        let instance = await props.usdt.deployed();
        const tx1 = await instance.approve(props.paymentProcessor.address, item.price);
        await tx1.wait();

        //encrypt the payment info with the seller's public key. Although the network is public 
        //no one who listens to the Ethereum transactions or events cannot read the shopping data unless he/she has the private key
        const encrypted = await axios.post(`${API_URL}/api/encryptWithPK/`, {
            message: payment.data,
            pubKey: SellerPubKey
            });

        //run Payment Processor's pay function
        const tx2 = await props.paymentProcessor.pay(item.price, JSON.stringify(encrypted));
        const receipt = await tx2.wait();
    
        await new Promise(resolve => setTimeout(resolve, 5000)); 
        const paymentResult = await axios.get(`${API_URL}/api/getPaymentResult/${payment.data}`)
        console.log(paymentResult);
        alert(paymentResult.data.result);
    }

    
    return(
        <div className="card text-center shadow">
            <div className="overflow">
                <img src={props.imgsrc} alt="Image 1" className="card-img-top"/>
            </div>
            <div className="card-body text-dark">
                <h4 className="card-title">{props.title}</h4>
                <p className="card-text tect-secondary">
                    {props.description}
                </p>
                <a className="btn btn-outline-success" onClick={()=>buy(ITEMS[props.itemId])}>Buy</a>
            </div>
        </div>
    )
}

export default Card;