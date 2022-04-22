const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const ether = require('ethers');
const PaymentProcessor = require('../frontend/src/contracts/PaymentProcessor.json');
const dbApi = require('./db2');
const sigUtil = require('@metamask/eth-sig-util');

const app = new Koa();

const router = new Router();


router.post('/api/getPaymentId', async ctx => {
    var body = ctx.request.query;
    const payment = { 
        pubKey: ctx.params.publicKey, 
        itemId: ctx.params.itemId,
        amount: await dbApi.getItemPrice(ctx.params.itemId),
        name: 'req.body.name',
        mail: 'req.body.mail',
        address: 'req.body.address',
        phone: 'req.body.phone',
        date: new Date().toISOString(),
        paymentStatus: false};

    const paymentRecord = await dbApi.insertPayment(payment);
    //create a db record with non paid flag
    //ctx.body = paymentRecord.insertedId;
    ctx.body = paymentRecord.insertedId.toString();
});

router.get('/api/getItemUrl/:paymentId', async ctx => {
    const payment = await dbApi.getPayment(ctx.params.paymentId);
    if(payment && payment.paymentStatus === true){
        ctx.body = {url: payment.itemId + ' ' + payment._id.toString()};
    }else {
        ctx.body = {url: ''};
    }
})

router.get('/api/encryptWithPK/:message/:publicKey(.*)', async ctx => {
    //const pubKey = ctx.params.publicKey;
    const message = ctx.params.message;

    const pubKey = ctx.params.publicKey;

    const result = await sigUtil.encrypt({
        publicKey: pubKey,
        data: message,
        version: 'x25519-xsalsa20-poly1305',
      });
    console.log(result);

    ctx.body = JSON.stringify(result);

    //decrypt with priv key
    // const res = await sigUtil.decrypt({
    //     encryptedData: result,
    //     privateKey: '69e14aed6e313e392c73a1b8068c97959d6d65e43581ce391bf2b7bab704ee7c',
    //   });
    // console.log(res);
})

//router.post()

async function decryptWithPrivKey(encrypted){
    var encryptedObj = JSON.parse(encrypted);
    var res = '';
    try {
        res = await sigUtil.decrypt({
            encryptedData: encryptedObj.data,
            privateKey: '69e14aed6e313e392c73a1b8068c97959d6d65e43581ce391bf2b7bab704ee7c',
          });
    } catch (error) {
        console.error(error);
    }
    return res;
}

app
    .use(bodyParser())
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(4000, () => {
    console.log('server running on port 4000');
})

const listenToEvents = () => {
    //const provider = new ether.ethers.providers.JsonRpcProvider('http://localhost:9545');
    //const networkId = '5777';
    const networkId = '4';
    //const provider = new ethers.providers.InfuraProvider("rinkeby", 'apiKey') //second parameter is api key
    //var wsProvider = new ethers.providers.WebSocketProvider("wss://rinkeby.infura.io/ws/v3/e3057d967cc34c9c9fc6af52690b0021", "rinkeby");
    const provider = new ether.ethers.providers.InfuraProvider("rinkeby", {
        projectId: 'e3057d967cc34c9c9fc6af52690b0021',
        projectSecret: '17fb7827ce4843ac889b00930cf5704b'
    });

    const paymentProcessor = new ether.ethers.Contract(
        PaymentProcessor.networks[networkId].address,
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
        await dbApi.updatePayment(JSON.parse(decrypted).paymentId);
    });
}
listenToEvents();