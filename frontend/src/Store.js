import React from 'react';
import conf from './config.json'; 

import Card from './cards/CardUI';
import '../src/cards/card-style.css';

import img1 from './images/aragorn.jpg';
import img2 from './images/legolas.jpg';
import img3 from './images/gimli.jpg';
import img4 from './images/gandalf.jpg';
import img5 from './images/frodo.jpg';
import img6 from './images/baramir.jpg';
import img7 from './images/elrond.jpg';
import img8 from './images/sauron.jpg';


const API_URL = conf.API_URL;
const SellerPubKey = '003X9PaFsuG2XUxV6OPHYiTR6buqNPCbeZzOxtCiuWE=';

var PersonalInfo = {'name':'', 'address':'', 'mail':'', 'phone':''};

function Store({ paymentProcessor, usdt, publicKey }) {

    function handleChange(event) {
        if(event.target.name === 'name'){PersonalInfo.name = event.target.value}
        else if(event.target.name === 'email'){PersonalInfo.mail = event.target.value}
        else if(event.target.name === 'address'){PersonalInfo.address = event.target.value}
        else if(event.target.name === 'phone'){PersonalInfo.phone = event.target.value}
      }
    
    async function getPersonalInfo(){
        return PersonalInfo;
    }

    return (
        <ul className='list-group'>
            <fieldset>
                <legend>Personal Info:</legend>
                <li className='list-group-item'>
                    <table>
                        <tbody>
                            <tr>
                                <td>*Name: </td>
                                <td>
                                    <input type="text" name="name" placeholder="Mick Jagger" onChange={handleChange}></input>
                                </td>
                            </tr>
                            <tr>
                                <td>*E-Mail: </td>
                                <td>
                                    <input type="email" name="email" placeholder="mickjagger@yeeha.com" onChange={handleChange}></input>
                                </td>
                            </tr>
                            <tr>
                                <td>*Address: </td>
                                <td>
                                    <input type="address" name="address" placeholder="marasi dr no 12 dubai" onChange={handleChange}></input>
                                </td>
                            </tr>
                            <tr>
                                <td>*Phone: </td>
                                <td>
                                    <input type="phone" name="phone" placeholder="+971584563526" onChange={handleChange}></input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </fieldset>
            

            <fieldset>
                <legend>Items:</legend>
                <div className="list-group-item">
                    <div className="row">
                        <div className="col-md-3">
                            <Card imgsrc={img1} title={"Aragorn"} description={"8 USDT"} itemId={"0"} publicKey={publicKey} usdt={usdt} paymentProcessor={paymentProcessor} personalInfo={PersonalInfo} getName = {getPersonalInfo}/>
                        </div>
                        <div className="col-md-3">
                            <Card imgsrc={img2} title={"Legolas"} description={"6 USDT"} itemId={"1"} publicKey={publicKey} usdt={usdt} paymentProcessor={paymentProcessor} personalInfo={PersonalInfo} getName = {getPersonalInfo}/>
                        </div>
                        <div className="col-md-3">
                            <Card imgsrc={img3} title={"Gimli"} description={"6 USDT"} itemId={"2"} publicKey={publicKey} usdt={usdt} paymentProcessor={paymentProcessor} personalInfo={PersonalInfo} getName = {getPersonalInfo}/>
                        </div>
                        <div className="col-md-3">
                            <Card imgsrc={img4} title={"Gandalf"} description={"7 USDT"} itemId={"3"} publicKey={publicKey} usdt={usdt} paymentProcessor={paymentProcessor} personalInfo={PersonalInfo} getName = {getPersonalInfo}/>
                        </div>
                        <div className="col-md-3">
                            <Card imgsrc={img5} title={"Frodo"} description={"4 USDT"} itemId={"4"} publicKey={publicKey} usdt={usdt} paymentProcessor={paymentProcessor} personalInfo={PersonalInfo} getName = {getPersonalInfo}/>
                        </div>
                        <div className="col-md-3">
                            <Card imgsrc={img6} title={"Baramir"} description={"4 USDT"} itemId={"5"} publicKey={publicKey} usdt={usdt} paymentProcessor={paymentProcessor} personalInfo={PersonalInfo} getName = {getPersonalInfo}/>
                        </div>
                        <div className="col-md-3">
                            <Card imgsrc={img7} title={"Elrond"} description={"5 USDT"} itemId={"6"} publicKey={publicKey} usdt={usdt} paymentProcessor={paymentProcessor} personalInfo={PersonalInfo} getName = {getPersonalInfo}/>
                        </div>
                        <div className="col-md-3">
                            <Card imgsrc={img8} title={"Sauron"} description={"20 USDT"} itemId={"7"} publicKey={publicKey} usdt={usdt} paymentProcessor={paymentProcessor} personalInfo={PersonalInfo} getName = {getPersonalInfo}/>
                        </div>
                    </div>
                </div>
            </fieldset>
        </ul>
    )
}

export default Store;