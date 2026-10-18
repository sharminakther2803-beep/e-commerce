const products = [
  { id: 1, name: "Pink Dress",  category: "clothing", emoji: "👗" },
  { id: 2, name: "Black Hoodie", category: "clothing", emoji: "🧥" },
  { id: 3, name: "Stylish Handbag",  category: "bags", emoji: "👜" },
  { id: 4, name: "Mini Backpack", category: "bags", emoji: "🎒" },
  { id: 5, name: "Sunglasses", category: "accessories", emoji: "🕶️" },
  { id: 6, name: "Pink Watch", category: "accessories", emoji: "⌚" },
  { id: 7, name: "Heels",category: "clothing", emoji: "👠" },
  { id: 8, name: "Cap", category: "accessories", emoji: "🧢" }
];

let cart = [];

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const cartPanel = document.getElementById("cart-panel");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

// Show products
function showProducts() {
  const text = searchInput.value.toLowerCase();
  const cat = categorySelect.value;

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(text) &&
    (cat === "all" || p.category === cat)
  );

  productList.innerHTML = filtered.length
    ? filtered.map(p => `
        <div class="card">
          <div class="emoji">${p.emoji}</div>
          <h3>${p.name}</h3>
          <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>`).join("")
    : "<p>No products found.</p>";
}

// Cart functions
function addToCart(id) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
}

function changeQty(id, change) {
  const item = cart.find(i => i.id === id);
  item.qty += change;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = cart.length
    ? cart.map(i => `
        <div class="cart-item">
          <div>${i.emoji} ${i.name}<br><small>৳${i.price}</small></div>
          <div class="qty">
            <button onclick="changeQty(${i.id}, -1)">-</button>
            <span>${i.qty}</span>
            <button onclick="changeQty(${i.id}, 1)">+</button>
          </div>
        </div>`).join("")
    : "<p>Your cart is empty.</p>";

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  cartTotal.textContent = total;
  cartCount.textContent = count;
}

// Events
searchInput.addEventListener("input", showProducts);
categorySelect.addEventListener("change", showProducts);
document.getElementById("cart-btn").addEventListener("click", () => cartPanel.classList.add("open"));
document.getElementById("close-cart").addEventListener("click", () => cartPanel.classList.remove("open"));

// Start
showProducts();
updateCart();