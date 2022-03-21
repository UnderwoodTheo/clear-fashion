const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const db = require('./db')

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
// test
app.get('/products/search', async (request, response) => {
  var limit = request.query.limit != null ? request.query.limit : 12;
  var brand = request.query.brand != null ? request.query.brand : /[a-zA-Z0-9]/i;
  var price = request.query.price != null ? parseInt(request.query.price) : Infinity;
  var query = {"brand": brand, "price": {"$lte": price}};
  console.log(query);
  var products = await db.find({"brand":brand, "price":{'$lte':price}});
  producs = products.sort((a, b) => a.price - b.price).slice(0, limit);
  var body = {}
  body.data.result = products
  body.success = products.length() > 0 ? true : false
  response.send(body);
});

app.get('/products/:id', async (request, response) => { 
  const id = request.params.id
  console.log(id)
  items = db.find()
  .then((item) => {
    products = item.filter(i => i._id == id)
    response.send(products)
  });
});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);