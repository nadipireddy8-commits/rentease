// =========================
// REGISTER
// =========================
function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:3000/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      window.location.href = "login.html";
    });
}

// =========================
// LOGIN
// =========================
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert("Login successful");

            localStorage.setItem("username", username);

            window.location.href = "location.html";
        } else {
            alert("Invalid login");
        }
    })
    .catch(err => {
        console.error(err);
        alert("Server error");
    });
}

// =========================
// LOAD PRODUCTS
// =========================
if (window.location.pathname.includes("products.html")) {

  fetch("http://localhost:3000/products")
    .then(res => res.json())
    .then(data => {

      let output = "";

      data.forEach(product => {
        output += `
          <div class="card">
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p>Monthly Rent: ₹${product.monthlyRent}</p>
            <p>Deposit: ₹${product.deposit}</p>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.monthlyRent})">
              Add to Cart
            </button>
            <hr>
          </div>
        `;
      });

      document.getElementById("productList").innerHTML = output;
    });
}

// =========================
// ADD TO CART
// =========================
function addToCart(id, name, price) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({ id, name, price });

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Product added to cart!");
}

// =========================
// DISPLAY CART
// =========================
if (document.getElementById("cartItems")) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let output = "";
  let total = 0;

  if (cart.length === 0) {
    output = "<p>Cart is empty</p>";
  } else {

    cart.forEach(item => {
      output += `
        <div class="card">
          <h3>${item.name}</h3>
          <p>Price: ₹${item.price}</p>
          <hr>
        </div>
      `;
      total += item.price;
    });

    output += `<h3>Total: ₹${total}</h3>`;
  }

  document.getElementById("cartItems").innerHTML = output;
}

// =========================
// CHECKOUT
// =========================
function checkout() {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  // Save as rentals
  localStorage.setItem("rentals", JSON.stringify(cart));

  // Clear cart
  localStorage.removeItem("cart");

  alert("Rental Successful!");

  window.location.href = "dashboard.html";
}

// =========================
// LOAD DASHBOARD RENTALS
// =========================
if (document.getElementById("rentalList")) {

  let rentals = JSON.parse(localStorage.getItem("rentals")) || [];
  let output = "";

  if (rentals.length === 0) {
    output = "<p>No Active Rentals</p>";
  } else {
    rentals.forEach(item => {
      output += ` <li>${item.name} - ₹${item.price}</li>`;
    });
  }

  document.getElementById("rentalList").innerHTML = output;
}
function searchProducts() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let cards = document.getElementsByClassName("card");

    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].getElementsByTagName("h3")[0];
        let text = title.innerText.toLowerCase();

        if (text.includes(input)) {
            cards[i].style.display = "block";
        } else {
            cards[i].style.display = "none";
        }
    }
}
function saveLocation() {
    const location = document.getElementById("userLocation").value;

    if (!location) {
        alert("Please enter location");
        return;
    }

    localStorage.setItem("location", location);
    window.location.href = "products.html";
}