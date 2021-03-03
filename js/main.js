'use strict';

let $ = document.querySelector.bind(document);
let addCartBtn = $('#add-cart-btn');
let buyBtn = $('#buy-btn');
let productList = $('#product-list');
let sizes = $('.sizes');
let cart = $('#cart');

const PRODUCT_DB = 'data/products.json';

let products = [];

let n = 0;


async function init() {
  addCartBtn.addEventListener('click', function(e){
    cart.classList.toggle('full');

    if (n % 2 !== 1) {
      cart.textContent = '(1) Cart';
      addCartBtn.textContent = 'Added ✔';
    } else {
      cart.textContent = '(0) Cart';
      addCartBtn.textContent = 'Add to Cart';
    }

    n++;
  });

  buyBtn.addEventListener('click', function(e){

  });

  productList.addEventListener('click', function(e){
    console.log(e);
    if (e.target.nodeName !== 'SPAN')
      return;

    let id = parseInt(e.target.id, 10);
    displayProduct(products[id]);
  });


  let resp = await fetch(PRODUCT_DB);
  let data = await resp.json();
  products = data.products;
  let product = products[1];
  displayProduct(product);

  sizes.addEventListener('click', function(e){
    console.log(e);
    if (e.target.nodeName !== 'SPAN')
      return;

    let el = e.target;
    console.log(el);
    $('.sizes .selected').classList.remove('selected');
    el.classList.add('selected');

    let price = el.dataset.price;

    $('#price-unit').textContent = price;
  });
}

function displayProduct(product) {
  $('p.description').textContent = product.description;
  $('#brand').textContent = product.brand;
  $('#product-name').textContent = product.name;
  $('#ar-product-name').textContent = product.name;

  let specsTable = $('.specs table');
  specsTable.textContent = '';
  for (let i = 0; i < product.specs.length; i++) {
    let spec = product.specs[i];
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    tr.appendChild(td);
    td.textContent = spec;
    specsTable.appendChild(tr);
  }

  sizes.textContent = '';
  let price = product.price;
  if (product.sizes) {
    for (let i = 0; i < product.sizes.length; i++) {
      let size = product.sizes[i];
      var div = document.createElement('span');
      div.dataset.price = size.price;
      div.dataset.model = size.model;
      div.textContent = size.size;
      sizes.appendChild(div);
    }
    price = product.sizes[0].price;
    $('.sizes > span:first-child').classList.add('selected');
  }
  $('#price-unit').textContent = price;


  let modelViewer = $('model-viewer');
  modelViewer.setAttribute('src', product.model);
}

//
init();
