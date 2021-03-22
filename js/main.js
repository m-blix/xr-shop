'use strict';

let $ = document.querySelector.bind(document);

let modelViewer = $('model-viewer');
let exitArButton = $('#exit-webxr-button-custom');

let addCartBtn = $('#add-cart-btn');
let buyBtn = $('#buy-btn');
let productList = $('#product-list');
let priceEl = $('#price-unit');
let sizes = $('.sizes');
let sizesSel = $('#sizes-sel');
let selectedSize = $('#selected-size');
let cart = $('#cart');

let annotation = $('#annotation');

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
    console.log('Added to cart');

    showDialog();

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

  let sizeClick = function(e){
    console.log('change size');
    console.log(e);
    if (e.target.nodeName !== 'SPAN')
      return;

    let el = e.target;
    console.log(el);

    updateSize(el.dataset);
  };
  sizes.addEventListener('click', sizeClick);
  sizesSel.addEventListener('click', sizeClick);


  selectedSize.addEventListener('click', function(e){
    sizesSel.classList.toggle('hide');
    return;
  });
}

function showDialog() {
  console.log('show dialog');

  let el = $('#overlay2');
  el.classList.remove('hide');
  addCartBtn.click();

  setTimeout(exitAR, 3000);
}

function exitAR() {
  console.log('exit AR');

  exitArButton.click();

  let el = $('#overlay2');
  el.classList.add('hide');
}

function updateSize(dataset) {
  updatePrice(dataset.price);

  selectedSize.textContent = dataset.size;


  annotation.textContent = dataset.size;

  let size = modelViewer.getDimensions();
  let sizes = {
    '55"': 0.89,
    '65"': 1.06,
    '75"': 1.22,
    '85"': 1.40
  };
  let y = sizes[dataset.size];
  modelViewer.updateHotspot({
      name: 'hotspot',
      position: `0 ${y} 0`
    });

  updateSelectedSize(dataset.size);

  updateModel(dataset.model);

  sizesSel.classList.add('hide');
}

function updatePrice(price) {
  $('#price-unit').textContent = price;
}

function updateModel(model) {
  console.log('update model to: ' + model);
  modelViewer.setAttribute('src', model);
}

function updateSelectedSize(size) {
  if (sizes.querySelector('.selected')) {
    sizes.querySelector('.selected').classList.remove('selected');
  }
  for (let i = 0; i < sizes.children.length; i++) {
    let s = sizes.children[i];
    if (size == s.dataset.size) {
      s.classList.add('selected');
    }
  }

  if (sizesSel.querySelector('.selected')) {
    sizesSel.querySelector('.selected').classList.remove('selected');
  }
  for (let i = 0; i < sizesSel.children.length; i++) {
    let s = sizesSel.children[i];
    if (size == s.dataset.size) {
      s.classList.add('selected');
    }
  }
}

function displayProduct(product) {
  $('p.description').textContent = product.description;
  $('#brand').textContent = product.brand;
  $('#product-name').textContent = product.name;
  $('#ar-product-name').textContent = product.shortName;

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
      let div = document.createElement('span');
      div.dataset.price = size.price;
      div.dataset.model = size.model;
      div.dataset.size = size.size;
      div.textContent = size.size;
      sizes.appendChild(div);

      let div2 = document.createElement('span');
      div2.dataset.price = size.price;
      div2.dataset.model = size.model;
      div2.dataset.size = size.size;
      div2.textContent = size.size;
      sizesSel.appendChild(div2);
    }
    price = product.sizes[0].price;
    selectedSize.textContent = product.sizes[0].size;
    updateSelectedSize(product.sizes[0].size);
  }
  updatePrice(price);

  modelViewer.setAttribute('src', product.model);
}

//
init();
