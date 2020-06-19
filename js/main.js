'use strict';

let $ = document.querySelector.bind(document);
let addCartBtn = $('#add-cart-btn');
let cart = $('#cart');

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

  let resp = await fetch('data/products.json');
  let data = await resp.json();
  //console.log(data);
  let product = data.products[0];
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
