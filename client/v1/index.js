// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}];

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);



/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
const cheapestTshirt = '';
// 2. Log the variable
console.log(cheapestTshirt);



/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
var nbProducts = marketplace.length;
// 2. Log the variable
console.log(nbProducts);


// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
let brandsName = [];
for(let i=0; i<marketplace.length; i++){
  let brand = marketplace[i].brand
  if(!(brandsName.includes(brand))){
    brandsName.push(brand)
  }
}
// 2. Log the variable
console.log(brandsName);
// 3. Log how many brands we have
console.log(brandsName.length);


// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
function sortByPrice(){
  var items = marketplace.slice(0);
  items.sort(function(a, b){
    return a.price - b.price;
  });
  return items;
}
// 2. Create a variable and assign it the list of products by price from lowest to highest
const sortedByPrice = sortByPrice();
// 3. Log the variable
console.log(sortedByPrice.slice(0,5));


// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
function sortByDate(){
  var items = marketplace.slice(0);
  items.sort(function(a, b){
    return a.date - b.date;
  });
  return items;
}
// 2. Create a variable and assign it the list of products by date from recent to old
const sortedByDate = sortByDate();
// 3. Log the variable
console.log(sortedByDate.slice(0, 5));


// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
function filterByPrice(low, high){
  var items = [];
  marketplace.forEach(item => {
    if(item.price <= high && item.price >= low){
      items.push(item);
    }
  });
  return items;
}
// 2. Log the list
console.log(filterByPrice(50, 100));


// 🎯 TODO: Average Basket
// 1. Determine the average basket of the marketplace
function avg(){
  var sum = 0;
  marketplace.forEach(item => {
    sum += item.price;
  });
  return sum / marketplace.length;
}
// 2. Log the average
console.log(avg());





/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
const brands = {};
brandsName.forEach(name => {
  brands[name] = [];
  marketplace.forEach(item => {
    if(name == item.brand){
      brands[name].push(item);
    }
  });
});
// 2. Log the variable
console.log(brands);
// 3. Log the number of products by brands
for(var brand in brands) {
  console.log(`brand: ${brand}, nb of products: ${brands[brand].length}`);
};


// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
const sortedBrandsByPrice = brands;
for(var brand in sortedBrandsByPrice){
  brands[brand].sort(function(a, b){
    return b.price - a.price;
  });
}
// 2. Log the sort
console.log(sortedBrandsByPrice);


// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
const sortedBrandsByDate = brands;
for(var brand in sortedBrandsByPrice){
  brands[brand].sort(function(a, b){
    return b.date - a.date;
  });
}
// 2. Log the sort
console.log(sortedBrandsByDate);





/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products
for(var brand in sortedBrandsByPrice){
  const percentile = 90;
  const rank = percentile / 100;
  const length = sortedBrandsByPrice[brand].length;
  const indexPercentile = Math.round(rank * length);
  console.log(`brand: ${brand}, p90 price value: ${sortedBrandsByPrice[brand][indexPercentile].price}`);
}




/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.
function releasedProducts(data){
  var today = new Date().getTime();
  var week = 1000*60*60*24*7;
  data.forEach(item => {
    var date = new Date(item.released).getTime();
    var diff = Math.abs(today - date);
    if(diff <= 2*week){
      console.log(item);
    }
    else{
      console.log('No new product');
    }
  });
}
releasedProducts(COTELE_PARIS);


// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€
const isBelowHundred = (value) => value < 100;
function reasonable(data){
  var prices = [];
  data.forEach(item => {
    prices.push(item.price);
  });
  console.log(prices.every(isBelowHundred));
}
reasonable(COTELE_PARIS);


// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
function findProduct(data, uuid){
  data.forEach(item => {
    if(item.uuid == uuid){
      console.log(item);
    }
  });
}
// 2. Log the product
findProduct(COTELE_PARIS, `b56c6d88-749a-5b4c-b571-e5b5c6483131`);


// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
function deleteProduct(data, uuid){
  for(let i=0; i<data.length; i++){
    if(data[i].uuid == uuid){
      delete data[i];
    }
  }
}
var copy = COTELE_PARIS;
deleteProduct(copy, `b56c6d88-749a-5b4c-b571-e5b5c6483131`);
// 2. Log the new list of product
console.log(copy);


// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;

jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables
console.log(blueJacket, jacket);
// 2. What do you notice?
blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties





/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
var localStorage = [];
MY_FAVORITE_BRANDS.forEach(brand => {
  if(!(localStorage.includes(brand))){
    localStorage.push(item);
  }
});
// 2. log the localStorage
console.log(localStorage);