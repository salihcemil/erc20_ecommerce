const MongoClient = require('mongodb');

const uri = "mongodb://localhost:27017";
var ObjectID = require('mongodb').ObjectId;

const client = new MongoClient(uri);


// const { MongoClient } = require("mongodb")
// var ObjectID = require('mongodb').ObjectId;
// const uri = "mongodb://localhost:27017";

// const client = new MongoClient(uri);

// module.exports.insertPayment = async function (payment) {
//         try{
//             await client.connect();
//             const database = client.db("Payment");
//             var result = await database.collection('payments').insertOne(payment);
//             return result;
//         } catch(error) {
//             console.log(error);
//           } finally{
//             await client.close();
//         }
//       };
// module.exports.getPayment = async function (paymentId) {
//         try{
//             await client.connect();
//             const database = client.db("Payment");
//             return await database.collection('payments').findOne({_id: ObjectID(paymentId)});   
//         }catch(error) {
//             console.log(error);
//           }finally{
//             await client.close();
//         }
//     };
// module.exports.updatePayment = async function (id) {
//         try{
//             await client.connect();
//             const database = client.db("Payment");
//             var newvalues = { $set: {paymentStatus: true} };  
//             const result = await database.collection('payments').updateOne({_id: ObjectID(id)}, newvalues);
//             return result;
//         }catch(error) {
//             console.log(error);
//           }finally{
//             await client.close();
//         }
// }