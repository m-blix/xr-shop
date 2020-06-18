'use strict';

let $ = document.querySelector.bind(document);
let addCartBtn = $('#add-cart-btn');
let cart = $('#cart');


let n = 0;
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
