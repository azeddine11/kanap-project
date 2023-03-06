const url = new URLSearchParams(document.location.search);
const id = url.get("_id");

let cart = JSON.parse(localStorage.getItem("product")) || []; // use empty array if cart doesn't exist in local storage

if (cart.length != 0) {
  document.getElementById('cart__items').innerHTML =  cart.map(e => {
        return `<article class="cart__item" data-id="${e._id}" data-couleur="${e.option}" data-quantité="${e.quantity}" data-prix="${e.price}"> 
        <div class="cart__item__img">
          <img src="${e.img}" alt="${e.alt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__titlePrice">
            <h2>${e.title}</h2>
            <span>couleur : ${e.option}</span>
            <p data-prix="${e.price}">${e.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${e.quantity}" >
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem"  onclick="deleteData('${e._id}')">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`
      }).join(''); // join the array of HTML strings into a single string
} else {
  document.querySelector("#totalQuantity").innerHTML = "0";
  document.querySelector("h1").innerHTML = "There's no item in the cart";
}

// DELETE DATA    
function deleteData(id) {
  let cart = JSON.parse(localStorage.getItem("product")) || [];
  const index = cart.findIndex(item => item._id === id);
  if (index !== -1) {
    cart.splice(index, 1);
    localStorage.setItem("product", JSON.stringify(cart));
    location.reload();
  }
}

// TOTAL COUNT
function totalPrices() {
  let s = JSON.parse(localStorage.getItem("product")) || [];
  var total = 0;
  var article = 0;
  s.forEach(e => {
     total += (e.price * e.quantity);
     article++;
  });
  document.getElementById('totalPrice').innerHTML =  total;
  document.getElementById('totalQuantity').innerHTML =  article;
}

totalPrices();

// UPDATE QUANTITY AND TOTAL PRICE
function updatePrice() {
  let cartItems = document.querySelectorAll('.cart__item');
  let totalPrice = 0;
  cartItems.forEach(item => {
    let quantityInput = item.querySelector('.itemQuantity');
    let price = parseFloat(item.dataset.prix);
    let quantity = parseInt(quantityInput.value);
    let itemTotalPrice = price * quantity;
    item.querySelector('.cart__item__content__titlePrice p').innerHTML = itemTotalPrice + ' €';
    totalPrice += itemTotalPrice;

    let itemId = item.dataset.id;
    let itemColor = item.dataset.couleur;
    let cart = JSON.parse(localStorage.getItem("product")) || [];
    let cartItemIndex = cart.findIndex(item => item._id === itemId && item.option === itemColor);
    if (cartItemIndex !== -1) {
      cart[cartItemIndex].quantity = quantity;
      localStorage.setItem("product", JSON.stringify(cart));
    }
  });


  document.getElementById('totalPrice').innerHTML = totalPrice

}
let quantityInputs = document.querySelectorAll('.itemQuantity');
quantityInputs.forEach(input => {
  input.addEventListener('change', updatePrice);
});


// COMMANDE PART 
let order = document.getElementById("order")

order.onclick= function(){


  location.replace("http://127.0.0.1:5500/front/html/confirmation.html")
  
};

// COMMANDE PART 