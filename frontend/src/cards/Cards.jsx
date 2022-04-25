import React, {Component} from "react";
import Card from './CardUI';

import img1 from '../images/aragorn.jpg';
import img2 from '../images/legolas.jpg';
import img3 from '../images/gimli.jpg';
import img4 from '../images/gandalf.jpg';
import img5 from '../images/frodo.jpg';
import img6 from '../images/baramir.jpg';

class Cards extends Component {
    render(){
        return(
            <div className="container-fluid d-flex justify-content-center">
                <div className="row">
                    <div className="col-md-4">
                        <Card imgsrc={img1} title={"Aragorn"} description={"8 USDT"}/>
                    </div>
                    <div className="col-md-4">
                        <Card imgsrc={img2} title={"Legolas"} description={"6 USDT"}/>
                    </div>
                    <div className="col-md-4">
                        <Card imgsrc={img3} title={"Gimli"} description={"6 USDT"}/>
                    </div>
                    <div className="col-md-4">
                        <Card imgsrc={img4} title={"Gandalf"} description={"7 USDT"}/>
                    </div>
                    <div className="col-md-4">
                        <Card imgsrc={img5} title={"Frodo"} description={"4 USDT"}/>
                    </div>
                    <div className="col-md-4">
                        <Card imgsrc={img6} title={"Baramir"} description={"4 USDT"}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cards;