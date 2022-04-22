const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const ether = require('ethers');
const PaymentProcessor = require('../frontend/src/contracts/PaymentProcessor.json');
const dbApi = require('./db2');
const sigUtil = require('@metamask/eth-sig-util');
const denv = require('dotenv');
denv.config();

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json())

const _privateKey = process.env.PRIVATE_KEY;


app.get('/api/getPaymentResult/:paymentId', async (req, res) => {
    const paymentObject = await dbApi.getPayment(req.params.paymentId);
    var responseString;
    if(paymentObject && paymentObject.paymentStatus === true){
        responseString = {result: 'Payment done with the item id: ' + paymentObject.itemId + ' and reference: ' + paymentObject._id.toString()};
    }else {
        responseString = {url: 'error in the process'};
    }
    res.send(responseString);
});

app.post('/api/encryptWithPK/', async (req, res) => {
    const message = req.body.message;
    const pubKey = req.body.pubKey;

    const result = await sigUtil.encrypt({
        publicKey: pubKey,
        data: message,
        version: 'x25519-xsalsa20-poly1305',
      });

    res.send(JSON.stringify(result));
});

app.post('/api/getPaymentId/', async (req, res) => {
    const paymentObject = { 
        pubKey: req.body.publicKey, 
        itemId: req.body.itemId,
        amount: await dbApi.getItemPrice(req.body.itemId),
        name: req.body.name,
        mail: req.body.mail,
        address: req.body.address,
        phone: req.body.phone,
        date: new Date().toISOString(),
        paymentStatus: false};

    const paymentRecord = await dbApi.insertPayment(paymentObject);
    //create a db record with non paid flag
    res.send(paymentRecord.insertedId.toString());
});

async function decryptWithPrivKey(encrypted){
    var encryptedObj = JSON.parse(encrypted);
    var res = '';
    try {
        res = await sigUtil.decrypt({
            encryptedData: encryptedObj.data,
            privateKey: _privateKey,
          });
    } catch (error) {
        console.error(error);
    }
    return res;
}

app.get('/', (req, res) => {
    res.send('This is a test API');
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}`));


const listenToEvents = () => {
    //const provider = new ether.ethers.providers.JsonRpcProvider('http://localhost:9545');
    //const networkId = '5777';
    const networkId = '4';
    //const provider = new ethers.providers.InfuraProvider("rinkeby", 'apiKey') //second parameter is api key
    //var wsProvider = new ethers.providers.WebSocketProvider("wss://rinkeby.infura.io/ws/v3/e3057d967cc34c9c9fc6af52690b0021", "rinkeby");
    const provider = new ether.ethers.providers.InfuraProvider("rinkeby", {
        projectId: process.env.RINKEBY_INFURA_PID,
        projectSecret: process.env.RINKEBY_INFURA_SK
    });

    const paymentProcessor = new ether.ethers.Contract(
        PaymentProcessor.networks[process.env.RINKEBY_NETWORK_ID].address,
        PaymentProcessor.abi,
        provider
    );

    paymentProcessor.on('PaymentDone', async (payer, amount, paymentId, date) => {
        console.log(`
            from ${payer}
            amount ${amount}
            paymentId ${paymentId}
            date ${(new Date(date.toNumber()*1000)).toLocaleString()}`);

        var decrypted = await decryptWithPrivKey(paymentId);
        await dbApi.updatePayment(decrypted);
    });
}
listenToEvents();