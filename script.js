const menuContainer = document.getElementById("menu");
const cartItemsContainer = document.getElementById("cart-items");
const totalDisplay = document.getElementById("total");
let cart = {};

function renderMenu() {
  menuContainer.innerHTML = "";
  menuItems.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("menu-item");
    const quantity = cart[item.id]?.quantity || 0;

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="menu-details">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <span>₹${item.price}</span><br />
        <div class="menu-actions" id="controls-${item.id}">
          ${quantity === 0
            ? `<button class="add-btn" onclick="addToCart(${item.id})">Add to Order</button>`
            : `
            <div class="qty-controls">
              <button class="qty-btn" onclick="removeFromCart(${item.id})">−</button>
              <span>${quantity}</span>
              <button class="qty-btn" onclick="addToCart(${item.id})">+</button>
            </div>`}
        </div>
      </div>
    `;
    menuContainer.appendChild(itemDiv);
  });
}

function addToCart(id) {
  if (cart[id]) {
    cart[id].quantity++;
  } else {
    const item = menuItems.find(i => i.id === id);
    cart[id] = { ...item, quantity: 1 };
  }
  updateCart();
  renderMenu();
  document.getElementById("cart").scrollIntoView({ behavior: "smooth" });
}

function removeFromCart(id) {
  if (cart[id]) {
    cart[id].quantity--;
    if (cart[id].quantity <= 0) delete cart[id];
  }
  updateCart();
  renderMenu();
}

function updateCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;
  Object.values(cart).forEach(item => {
    total += item.price * item.quantity;
    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <span>${item.name} x ${item.quantity}</span>
        <span>₹${item.price * item.quantity}</span>
      </div>`;
  });
  totalDisplay.textContent = `Total: ₹${total}`;
}

function placeOrder() {
  if (!Object.keys(cart).length) return alert("Your cart is empty!");
  let summary = "Your Order:\n";
  Object.values(cart).forEach(item => {
    summary += `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
  });
  summary += totalDisplay.textContent;
  alert(summary);
}

renderMenu();
