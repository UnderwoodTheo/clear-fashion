// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};
let currentBrand = 'all';

// inititiate selectors
const selectShow = document.querySelector('#show-select'); // feature 0
const selectPage = document.querySelector('#page-select'); // feature 1
const sectionProducts = document.querySelector('#products'); // feature 11
const spanNbProducts = document.querySelector('#nbProducts'); // feature 7
const selectBrand = document.querySelector('#brand-select'); // feature 2 NOT WORKING
const selectRecent = document.querySelector('#recently-released'); // feature 3
const selectReasonable = document.querySelector('#reasonable-price'); // feature 4
const selectSort = document.querySelector('#sort-select'); // features 5 - 6
const spanNbNewProducts = document.querySelector('#nbNewProducts'); // feature 8
const spanP50 = document.querySelector('#p50');
const spanP90 = document.querySelector('#p90');
const spanP95 = document.querySelector('#p95'); // feature 9
const spanLastDate = document.querySelector('#lastDate'); // feature 10
const checkFavorite = document.querySelector('#add-favorite'); // feature 12 NOT WORKING
const selectFavorite = document.querySelector('#get-favorite'); // feature 13 NOT WORKING

/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  //meta.pageSize = selectShow.options[selectShow.selectedIndex].value;
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [limit=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, limit = 12, brand = currentBrand) => {
  try {
    currentBrand = brand;
    const response = await fetch(
      //`https://clear-fashion-api.vercel.app?page=${page}&size=${limit}`
      `https://clear-fashion-server-psi.vercel.app/products/search?page=${page}&limit=${limit}&brand=${brand}`
    );
    const body = await response.json();
    console.log(body)
    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }
    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

const getBrands = (products) => {
  let brandsName = [];
  for(let i=0; i<products.length; i++){
    let brand = products[i].brand
    if(!(brandsName.includes(brand))){
      brandsName.push(brand)
    }
  }
  return brandsName;
}

/*const renderBrands = products => {
  let brands = getBrands(products);
  const options = Array.from(
    {'length': brands.length},
    (value, index) => `<option value="${brands[index]}">${brands[index]}</option>`
  ).join('');
  selectBrand.innerHTML = options;
  //selectBrand.selectedIndex = brands.indexOf(s);  
};*/

const percentile = (percent, products) => {
  products.sort((a, b) => a.price - b.price);
  const rank = percent / 100;
  const length = products.length;
  const indexPercentile = Math.round(rank * length);
  return products[indexPercentile].price;
};

const addToFavorite = products => {
  products.forEach(product => {
    if(checkFavorite.checked == true){
      product.favorite = true;
    }
  });
};

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');

  // filter by brand
  /*if(selectBrand.options[selectBrand.selectedIndex].value != null){
    const brand = products.filter(product => product.brand == selectBrand.options[selectBrand.selectedIndex].value);
    products = brand;
  }
  console.log(products);

  if(selectBrand.options[selectBrand.selectedIndex].value != 'all'){

  }*/

  // recent products
  if(selectRecent.options[selectRecent.selectedIndex].value == 'yes'){
    const recent = [];
    var today = new Date().getTime();
    var week = 1000*60*60*24*7;
    products.forEach(product => {
      var date = new Date(product.released).getTime();
      var diff = Math.abs(today - date);
      if(diff <= 2*week){
        recent.push(product);
      }
    });
    products = recent;
  }

  // reasonable price, ie, less than 50€
  if(selectReasonable.options[selectReasonable.selectedIndex].value == 'yes'){
    const reasonable = products.filter(product => product.price <= 50);
    products = reasonable;
  }

  // sort by price asc
  if(selectSort.options[selectSort.selectedIndex].value == 'price-asc'){
    products.sort((a, b) => a.price - b.price);
  }

  // sort by price desc
  if(selectSort.options[selectSort.selectedIndex].value == 'price-desc'){
    products.sort((a, b) => b.price - a.price);
  }

  // sort by date asc
  if(selectSort.options[selectSort.selectedIndex].value == 'date-asc'){
    products.sort((a, b) => new Date(b.released) - new Date(a.released));
  }

  // sort by date desc
  if(selectSort.options[selectSort.selectedIndex].value == 'date-desc'){
    products.sort((a, b) => new Date(a.released) - new Date(b.released));
  }

  // filter by favorite
  if(selectFavorite.options[selectFavorite.selectedIndex].value == 'yes'){
    const fav = products.filter(product => product.favorite);
    products = fav;
  }

  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <input type="checkbox" id="add-favorite">
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
      </div>
    `;
    })
    .join('');
  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = (pagination, products) => {
  const {count} = pagination;

  spanNbProducts.innerHTML = count;

  // nb of recent products
  const recent = [];
  var today = new Date().getTime();
  var week = 1000*60*60*24*7;
  products.forEach(product => {
    var date = new Date(product.released).getTime();
    var diff = Math.abs(today - date);
    if(diff <= 2*week){
      recent.push(product);
    }
  });
  spanNbNewProducts.innerHTML = recent.length;

  // percentiles
  spanP50.innerHTML = percentile(50, products);
  spanP90.innerHTML = percentile(90, products);
  spanP95.innerHTML = percentile(95, products);

  // last released
  products.sort((a, b) => new Date(b.released) - new Date(a.released));
  spanLastDate.innerHTML = products[0].released;
};

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination, products);
  //renderBrands(products);
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 * @type {[type]}
 */
selectShow.addEventListener('change', event => {
  fetchProducts(1, parseInt(event.target.value))
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination))
);

selectPage.addEventListener('change', event => {
  fetchProducts(parseInt(event.target.value), currentPagination.pageSize)
  .then(setCurrentProducts)
  .then(() => render(currentProducts, currentPagination))
});

selectBrand.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage, currentPagination.pageSize, event.target.value)
  .then(setCurrentProducts)
  .then(() => render(currentProducts, currentPagination));
});

selectRecent.addEventListener('change', event => {
  render(currentProducts, currentPagination);
});

selectReasonable.addEventListener('change', event => {
  render(currentProducts, currentPagination);
});

selectSort.addEventListener('change', event => {
  render(currentProducts, currentPagination);
});
/*
checkFavorite.addEventListener('click', event => {
  render(currentProducts, currentPagination);
});*/

selectFavorite.addEventListener('change', event => {
  render(currentProducts, currentPagination);
});