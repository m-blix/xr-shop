'use strict';

let $ = document.querySelector.bind(document);
let addCartBtn = $('#add-cart-btn');
let productList = $('#product-list');
let cart = $('#cart');

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

  productList.addEventListener('click', function(e){
    console.log(e);
    if (e.target.nodeName !== 'SPAN')
      return;

    let id = parseInt(e.target.id, 10);
    displayProduct(products[id]);
  });


  let resp = await fetch('data/products.json');
  let data = await resp.json();
  products = data.products;
  let product = products[1];
  displayProduct(product);
}

function displayProduct(product) {
  $('p.description').textContent = product.description;
  $('#price-unit').textContent = product.price;
  $('#brand').textContent = product.brand;
  $('#product-name').textContent = product.name;

  let specsTable = $('.specs table');
  for (let i = 0; i < product.specs.length; i++) {
    let spec = product.specs[i];
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    tr.appendChild(td);
    td.textContent = spec;
    specsTable.appendChild(tr);
  }

  let modelViewer = $('model-viewer');
  modelViewer.setAttribute('src', product.model);
}

//
init();
