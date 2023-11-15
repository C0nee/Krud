
const { MongoClient } = require('mongodb');

const url = "mongodb+srv://jakubczajkowski04:1234@tak.5m1sarn.mongodb.net/?retryWrites=true&w=majority";



async function connect() {
    const client =  new MongoClient(url);
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        return client;
    } catch (e) {
        console.log("Error connecting to database: " + e);
        process.exit(1);
    }
}

async function getAllListings(client) {
    
    const collection = await client.db('sample_airbnb').collection('listingsAndReviews');
    
    let list = collection.find().toArray();
    return list;
}
async function get(client,criteria){
    
    const collection = await client.db('sample_airbnb').collection('listingsAndReviews');
    let list = collection.find(criteria).toArray();
    return list;
}
async function add(client,data){
    const collection = await client.db('sample_airbnb').collection('listingsAndReviews');
    collection.insertOne(data,(error, response)=>{
        if(error){
            console.log("Błąd podczas dodawania rekordu!");
            return false
        }
        else{
            return true
        }
    });
}
function close(client) {
    client.close();
    console.log("Successfully disconnected from MongoDB");
}

module.exports = {connect, getAllListings, close,get,add}
