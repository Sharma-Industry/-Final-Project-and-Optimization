document.addEventListener('DOMContentLoaded', function() {
 const loginForm = document.getElementById("adminLoginForm");
  loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = loginForm.email.value.trim();
  const password = loginForm.password.value;

  const savedEmail = localStorage.getItem("userEmail");
  const savedPassword = localStorage.getItem("userPassword");

  if (email === savedEmail && password === savedPassword) {
    alert(" Email Login Successful!");
    // Optionally redirect to admin dashboard or homepage
    window.location.href = "94.html";
  } else {
    alert("Invalid Email or Password.");
  }
  });
});

// order karnay kay leya ha
const menuItems = [
    { id: 1, name: "Paneer Tikka", price: 12.99, category: "starters", image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2014/11/paneer-tikka-masala-recipe-1-500x500.jpg" },
    { id: 2, name: "Butter Chicken", price: 7.99, category: "main", image: "https://motionsandemotions.com/wp-content/uploads/2023/04/Untitled-design-21-1.jpg" },
    { id: 3, name: "Gulab Jamun", price: 9.99, category: "desserts", image: "https://5.imimg.com/data5/SELLER/Default/2024/2/384944363/DN/MV/KT/144303146/gulab-jamun-desi-ghee.jpg" },
    { id: 4, name: "Cheese Garlic Bread", price: 5.99, category: "starters", image: "https://media.istockphoto.com/id/487219905/photo/toasted-cheese-and-garlic-bread.jpg?s=612x612&w=0&k=20&c=xtSkUMnkl1IUaahfWhS4uAtvFfHMgJLQwEsX_86Pve8=" },
    { id: 5, name: "White Sauce Pasta", price: 10.99, category: "main", image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2024/04/white-sauce-pasta.jpg" },
    { id: 6, name: "Vanilla Ice Cream", price: 4.99, category: "desserts", image: "https://cdn.loveandlemons.com/wp-content/uploads/2023/06/homemade-ice-cream.jpg" },
    { id: 7, name: "Veggie Pizza", price: 9.99, category: "main", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkuBrs55nxRdA1ja7l3dZBZ8hpZPn2zBF9yA&s" },
    { id: 8, name: "Cold Coffee", price: 4.99, category: "desserts", image: "https://img.freepik.com/premium-photo/iced-coffee-roasted-coffee-wood-table_36078-57.jpg?semt=ais_hybrid&w=740" },
    { id: 9, name: "Spring Rolls", price: 6.49, category: "starters", image: "https://herbsandflour.com/wp-content/uploads/2023/10/Crispy-Vegetable-Spring-Rolls-Recipe.jpg" },
    { id: 10, name: "Chicken Biryani", price: 11.99, category: "main", image: "https://www.prideindiabrands.com/cdn/shop/articles/shutterstock_1815239114_1600x.jpg?v=1629451357" },
    { id: 11, name: "Rasgulla", price: 5.99, category: "desserts", image: "https://prashantcorner.com/cdn/shop/products/RASGULLA_2457ea2c-400a-4130-b540-b77966e63d07.jpg?v=1673073151&width=1946" },
    { id: 12, name: "Hakka Noodles", price: 8.49, category: "main", image: "https://vegecravings.com/wp-content/uploads/2017/03/veg-hakka-noodles-recipe-with-step-by-step-instructions.jpg" },
    { id: 13, name: "Manchurian Balls", price: 7.49, category: "starters", image: "https://t3.ftcdn.net/jpg/05/78/38/18/360_F_578381815_ugpiawU0Hlz4UFcI7622oAUNR5otsR6v.jpg" },
    { id: 14, name: "Sizzling Brownie", price: 6.99, category: "desserts", image: "https://img.freepik.com/premium-photo/brownie-with-ice-cream-chocolate-sauce_777078-43412.jpg" },
    { id: 15, name: "Masala Dosa", price: 7.99, category: "main", image: "https://www.mydelicious-recipes.com/home/images/120_1200_1200/mydelicious-recipes-masala-dosa-with-batter" },
    { id: 16, name: "Kesar Pista Kulfi", price: 5.49, category: "desserts", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSunthQdfnJ3wxQtdAgwvwnLR55-HEkExBXXA&s" },
];

let cart = [];

function loadMenuItems(filter = "all") {
    const grid = document.querySelector(".menu-grid");
    grid.innerHTML = "";

    const filteredItems = filter === "all" ? menuItems : menuItems.filter(item => item.category === filter);

    filteredItems.forEach(item => {
        const div = document.createElement("div");
        div.className = "menu-item";
        div.setAttribute("data-id", item.id);
        div.setAttribute("data-name", item.name);
        div.setAttribute("data-price", item.price);
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h4>${item.name}</h4>
            <p>$${item.price.toFixed(2)}</p>
            <button class="add-to-cart-btn">Add to Cart</button>
        `;
        grid.appendChild(div);
    });

    document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
        btn.addEventListener("click", addToCart);
    });
}

function addToCart(e) {
    const itemDiv = e.target.closest(".menu-item");
    const id = itemDiv.getAttribute("data-id");
    const name = itemDiv.getAttribute("data-name");
    const price = parseFloat(itemDiv.getAttribute("data-price"));

    const existing = cart.find(item => item.id == id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id, name, price, qty: 1 });
    }

    updateOrderDisplay();
}

function updateOrderDisplay() {
    const orderItemsDiv = document.getElementById("orderItems");
    const totalDiv = document.getElementById("orderTotal");
    orderItemsDiv.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        const div = document.createElement("div");
        div.className = "order-item";
        div.innerHTML = `${item.name} x ${item.qty} - $${(item.price * item.qty).toFixed(2)}`;
        orderItemsDiv.appendChild(div);
    });

    totalDiv.textContent = `$${total.toFixed(2)}`;
}

// Category filter buttons
document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        loadMenuItems(btn.getAttribute("data-category"));
    });
});

// Initial Load
document.addEventListener("DOMContentLoaded", () => {
    loadMenuItems();
});


// iteam show hone ka laya ha //
document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    const orderItems = document.getElementById("orderItems");
    const orderTotal = document.getElementById("orderTotal");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const item = button.closest(".menu-item");
            const name = item.getAttribute("data-name");
            const price = parseFloat(item.getAttribute("data-price"));

            // Add to cart
            cart.push({ name, price });

            // Update item list
            renderCartItems();
        });
    });

    function renderCartItems() {
        orderItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "order-item";
            div.textContent = `${item.name} - ₹${item.price.toFixed(2)}`;
            orderItems.appendChild(div);
            total += item.price;
        });

        orderTotal.textContent = `₹${total.toFixed(2)}`;
    }
});


//local storage ha
document.getElementById("orderForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = this.name.value;
    const email = this.email.value;
    const phone = this.phone.value;
    const address = this.address.value;
    const items = JSON.parse(localStorage.getItem("cartItems")) || []; // Assume items stored earlier
    const total = document.getElementById("orderTotal").textContent;

    const newOrder = {
        id: "ORD" + Date.now(),
        customer: name,
        email: email,
        phone: phone,
        address: address,
        items: items.map(item => item.name),
        total: total,
        status: "pending"
    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    alert("Order successfully!");
    this.reset();
    document.getElementById("orderItems").innerHTML = "";
    document.getElementById("orderTotal").textContent = "₹0.00";
    localStorage.removeItem("cartItems");
});


//login in loginout
const authLink = document.getElementById("authLink");

  // Check login status on page load
  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      authLink.textContent = "Logout";
    } else {
      authLink.textContent = "Login";
    }
  });

  // Toggle login/logout on click
  authLink.addEventListener("click", (e) => {
    e.preventDefault();
    if (localStorage.getItem("isLoggedIn") === "true") {
      // Logout
      localStorage.setItem("isLoggedIn", "false");
      authLink.textContent = "Login";
      alert("You are logged out.");
      // Optional: redirect to homepage or login page
      // window.location.href = "index.html";
    } else {
      // Login (fake logic — replace with real auth flow)
      localStorage.setItem("isLoggedIn", "true");
      authLink.textContent = "Logout";
      alert("You are logged in User.");
      // Optional: redirect to admin panel
       window.location.href = "web.html";
    }
  });
