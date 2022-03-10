var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://tunderwood:bstgk0UGWEtnjZFo@wepapp.prsdf.mongodb.net/WebApp?retryWrites=true&w=majority';

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("WepApp");
  var query = {"brand": '$all', "price": {"$lte": 30}};
  //var query = { price: {"$lte":100}};
  //var query = {price: {$sort:-1}};
  console.log(query)
  dbo.collection("products").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

/*var products = [];

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("WepApp");
    //var query = { brand: "dedicated" };
    //var query = { price: {"$lte":100}};
    dbo.collection("products").find().sort({'price':-1}).toArray(function(err, result) {
      if (err) throw err;
      //console.log(result);
      products.push(result);
      db.close();
    });
  });

products.forEach(element => {
  console.log(element);
});*/

/*
function getAllProducts(){
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("WepApp");
    dbo.collection("products").find().toArray(function(err, result) {
      if (err) throw err;
      return result;
      db.close();
    });
  });
}

getAllProducts();

module.exports = {getAllProducts};*/