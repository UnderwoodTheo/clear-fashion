const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const db = require('./db')

/*const {MongoClient} = require('mongodb');
const MONGODB_DB_NAME = 'WepApp';
const MONGODB_COLLECTION = 'products';
const MONGODB_URI = 'mongodb+srv://tunderwood:bstgk0UGWEtnjZFo@wepapp.prsdf.mongodb.net/WebApp?retryWrites=true&w=majority';

let client = null;
let database = null;

const getDB = async () => {
  try {
    if (database) {
      console.log('💽  Already Connected');
      return database;
    }

    client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    database = client.db(MONGODB_DB_NAME);

    console.log('💽  Connected');

    return database;
  } catch (error) {
    console.error('🚨 MongoClient.connect...', error);
    return null;
  }
};

const find = async query => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.find(query).toArray();

    return result;
  } catch (error) {
    console.error('🚨 collection.find...', error);
    return null;
  }
};

const close = async () => {
  try {
    await client.close();
  } catch (error) {
    console.error('🚨 MongoClient.close...', error); 
  }
};*/

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

app.get('/products/:id', async (request, response) => { 
  const id = request.params.id
  items = db.find()
  .then((item) => {
    products = item.filter(i => i._id == id)
    response.send(products)
  });
});

app.get('/product/:search', async (request, response) => {
  var limit = request.query.limit != null ? request.query.limit : 12;
  var brand = request.query.brand != null ? request.query.brand : /[a-zA-Z0-9]/i;
  var price = request.query.price != null ? request.query.price : Infinity;
  query = {"brand": brand, "price": {"$lte": price}};
  console.log(query);
  var products = await db.find({"brand":brand, "price":{'$lte':price}});
  response.send(products.sort((a, b) => a.price - b.price).slice(0, limit));
});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);