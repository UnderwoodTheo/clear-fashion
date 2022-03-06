var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://tunderwood:bstgk0UGWEtnjZFo@wepapp.prsdf.mongodb.net/WebApp?retryWrites=true&w=majority';

/*MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("WepApp");
  //var query = { brand: "dedicated" };
  //var query = { price: {"$lte":100}};
  var query = {price: {$sort:-1}};
  dbo.collection("products").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});*/


MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("WepApp");
    //var query = { brand: "dedicated" };
    //var query = { price: {"$lte":100}};
    dbo.collection("products").find().sort({'price':-1}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });