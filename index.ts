const cart = [];
const cartList = document.getElementById("cart-list");
const cartTotal = document.getElementById("cart-total");

const addButtons = document.querySelectorAll(".add-to-cart");

addButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const productDiv = e.target.closest(".product");
    const id = parseInt(productDiv.dataset.id);
    const name = productDiv.dataset.name;
    const price = parseInt(productDiv.dataset.price);

    addToCart({ id, name, price });
  });
});

//
function addToCart(product) {
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

//
function renderCart() {
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    const li = document.createElement("li");
    li.innerHTML = `
        ${item.name} - ${item.quantity} عدد 
        <button onclick="removeFromCart(${item.id})"></button>
      `;
    cartList.appendChild(li);
  });

  cartTotal.innerText = total.toLocaleString() + " هزار تومان";
}

//
function removeFromCart(productId) {
  const index = cart.findIndex((item) => item.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
  }
  renderCart();
}
