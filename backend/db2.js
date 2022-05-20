const { MongoClient } = require("mongodb")
var ObjectID = require('mongodb').ObjectId;
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

module.exports.insertPayment = async function (payment) {
        try{
            await client.connect();
            const database = client.db("Payment");
            var result = await database.collection('payments').insertOne(payment);
            return result;
        } catch(error) {
            console.log(error);
          } finally{
            await client.close();
        }
      };
module.exports.getPayment = async function (paymentId) {
        try{
            await client.connect();
            const database = client.db("Payment");
            var result = await database.collection('payments').findOne({_id: ObjectID(paymentId)});   
            return result;
        }catch(error) {
            console.log(error);
          }finally{
            await client.close();
        }
    };
module.exports.updatePayment = async function (id) {
        try{
            await client.connect();
            const database = client.db("Payment");
            var newvalues = { $set: {paymentStatus: true} };  
            const result = await database.collection('payments').updateOne({_id: ObjectID(id)}, newvalues);
            return result;
        }catch(error) {
            console.log(error);
          }finally{
            await client.close();
        }
}

module.exports.getItemPrice = async function (itemId){
    switch (itemId) {
      case '0':
        return 8
      case '1':
        return 6
      case '2':
        return 6
      case '3':
        return 7
      case '4':
        return 4
      case '5':
        return 4
      case '6':
        return 5
      case '7':
        return 20
      default:
        return 0
    }
}